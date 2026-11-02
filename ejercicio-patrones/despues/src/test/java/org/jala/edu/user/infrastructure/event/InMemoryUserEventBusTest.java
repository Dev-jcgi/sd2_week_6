package org.jala.edu.user.infrastructure.event;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import org.jala.edu.user.application.port.out.UserEventListener;
import org.jala.edu.user.domain.event.UserEvent;
import org.jala.edu.user.domain.event.UserRoleChanged;
import org.jala.edu.user.domain.model.UserId;
import org.jala.edu.user.domain.model.UserRole;
import org.junit.jupiter.api.Test;

class InMemoryUserEventBusTest {
    @Test
    void notifiesEverySubscriberAndStopsAfterUnsubscribe() {
        InMemoryUserEventBus bus = new InMemoryUserEventBus();
        List<String> received = new ArrayList<>();
        UserEventListener first = e -> received.add("first");
        UserEventListener second = e -> received.add("second");
        bus.subscribe(first);
        bus.subscribe(second);
        UserEvent event = new UserRoleChanged(UserId.newId(), UserRole.CUSTOMER, UserRole.MERCHANT, Instant.now());

        bus.publish(event);
        bus.unsubscribe(first);
        bus.publish(event);

        assertEquals(List.of("first", "second", "second"), received);
    }
}
