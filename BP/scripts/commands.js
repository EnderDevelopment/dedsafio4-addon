import { world, system } from '@minecraft/server';

// Command registration and handling

export function registerCommands() {
    // Register player commands
    world.beforeEvents.chatSend.subscribe((event) => {
        const player = event.sender;
        const message = event.message;

        if (message.startsWith('!')) {
            event.cancel = true;
            handlePlayerCommand(player, message);
        }
    });

    // Register admin commands
    world.beforeEvents.chatSend.subscribe((event) => {
        const player = event.sender;
        const message = event.message;

        if (message.startsWith('!admin')) {
            event.cancel = true;
            if (hasAdminPermission(player)) {
                handleAdminCommand(player, message);
            } else {
                player.sendMessage('You do not have permission to use admin commands.');
            }
        }
    });
}

function handlePlayerCommand(player, command) {
    // Handle player commands
    switch (command) {
        case '!help':
            showPlayerHelp(player);
            break;
        case '!missions':
            showMissions(player);
            break;
        case '!brotherhood':
            showBrotherhood(player);
            break;
        // Add more player commands as needed
        default:
            player.sendMessage(`Unknown command: ${command}`);
    }
}

function handleAdminCommand(player, command) {
    // Handle admin commands
    switch (command) {
        case '!admin startday':
            startNewDay();
            break;
        case '!admin event':
            announceEvent();
            break;
        // Add more admin commands as needed
        default:
            player.sendMessage(`Unknown admin command: ${command}`);
    }
}

function hasAdminPermission(player) {
    // Check if player has admin permission
    // Implement your permission checking logic here
    return player.isOp();
}

// Helper functions
function showPlayerHelp(player) {
    player.sendMessage('Available commands:\n!help - Show this help message\n!missions - Show your missions\n!brotherhood - Show your brotherhood');
}

function showMissions(player) {
    // Implement mission display logic
    player.sendMessage('Missions system not yet implemented.');
}

function showBrotherhood(player) {
    // Implement brotherhood display logic
    player.sendMessage('Brotherhood system not yet implemented.');
}

function startNewDay() {
    // Implement day start logic
    world.sendMessage('A new day has begun!');
}

function announceEvent() {
    // Implement event announcement logic
    world.sendMessage('An event is about to start!');
}