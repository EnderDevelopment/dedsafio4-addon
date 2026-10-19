import { world, system } from '@minecraft/server';

// Days and events system

export function initializeEventsSystem() {
    // Initialize day and event tracking
    let currentDay = 1;
    let eventActive = false;
    let eventTimer = 0;

    // Register system update for timers
    system.runInterval(() => {
        if (eventActive && eventTimer > 0) {
            eventTimer--;
            if (eventTimer === 0) {
                endEvent();
            }
        }
    }, 20); // Run every second (20 ticks)

    // Function to start a new day
    function startNewDay() {
        currentDay++;
        world.sendMessage(`Day ${currentDay} has begun!`);
        // Add any day-specific logic here
    }

    // Function to announce an event
    function announceEvent(eventName, duration) {
        if (!eventActive) {
            eventActive = true;
            eventTimer = duration;
            world.sendMessage(`Event '${eventName}' has started! It will last for ${duration} seconds.`);
            // Add any event-specific logic here
        } else {
            world.sendMessage('An event is already in progress.');
        }
    }

    // Function to end the current event
    function endEvent() {
        eventActive = false;
        world.sendMessage('The current event has ended.');
        // Add any post-event logic here
    }

    // Expose functions to other modules
    return {
        startNewDay,
        announceEvent,
        endEvent,
        getCurrentDay: () => currentDay,
        isEventActive: () => eventActive,
        getEventTimer: () => eventTimer
    };
}