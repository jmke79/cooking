<?php
$title = 'LEBASI XP Terminal';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($title) ?></title>
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>
    <div id="app" class="bios">
        <div class="screen bios-screen active" id="bios-screen">
            <div class="bios-header">LEBASI BIOS v1.0</div>
            <div class="bios-body">
                <p>Initializing LE Basi LAN Party BIOS...</p>
                <p>Detecting players: 12 seats ready.</p>
                <p>Checking gaming rigs... OK</p>
                <p>Loading energy drinks... OK</p>
                <p>Preparing retro XP boot...</p>
                <p class="bios-footer">Press DEL to enter party setup</p>
            </div>
        </div>

        <div class="screen boot-screen" id="boot-screen">
            <div class="boot-logo">
                <div class="boot-title">Windows XP // LEBASI Edition</div>
                <div class="boot-subtitle">LAN Party Loader</div>
            </div>
            <div class="boot-progress">
                <div class="boot-bar"></div>
            </div>
            <div class="boot-messages">
                <p>Loading party playlist...</p>
                <p>Configuring 12-player network...</p>
                <p>Mounting snack drives...</p>
                <p>Launching XP desktop shell...</p>
            </div>
        </div>

        <div class="screen login-screen" id="login-screen">
            <div class="login-window">
                <div class="login-header">
                    <div class="login-logo" aria-hidden="true">
                        <span class="logo-orb"></span>
                        <span class="logo-text">
                            <span class="logo-brand">LEBASI</span>
                            <span class="logo-edition">XP Edition</span>
                        </span>
                    </div>
                    <div class="login-title">LAN Party Access Console</div>
                </div>
                <div class="login-body">
                    <div class="user-info">
                        <div class="user-avatar" aria-hidden="true">LB</div>
                        <div>
                            <div class="user-name">lebasi</div>
                            <div class="user-hint">Password hint: Welcome01</div>
                        </div>
                    </div>
                    <form id="login-form">
                        <label for="username">Username</label>
                        <input type="text" id="username" autocomplete="off" value="lebasi">
                        <label for="password">Password</label>
                        <input type="password" id="password" autocomplete="off" placeholder="Enter password">
                        <button type="submit">Log On</button>
                        <div class="login-error" id="login-error"></div>
                    </form>
                </div>
            </div>
        </div>

        <div class="screen desktop-screen" id="desktop-screen">
            <div class="desktop" id="desktop">
                <div class="desktop-icons" role="list">
                    <button type="button" class="desktop-icon" data-window="terminal" role="listitem">
                        <span class="icon-image icon-terminal" aria-hidden="true"></span>
                        <span class="icon-label">Party Terminal</span>
                    </button>
                    <button type="button" class="desktop-icon" data-window="briefing" role="listitem">
                        <span class="icon-image icon-briefing" aria-hidden="true"></span>
                        <span class="icon-label">LAN Briefing</span>
                    </button>
                    <button type="button" class="desktop-icon" data-window="scoreboard" role="listitem">
                        <span class="icon-image icon-scoreboard" aria-hidden="true"></span>
                        <span class="icon-label">Scoreboard</span>
                    </button>
                </div>

                <div class="window" id="window-terminal" data-window="terminal" aria-hidden="true">
                    <div class="window-titlebar">
                        <span class="window-title">LEBASI Command Terminal</span>
                        <div class="window-controls">
                            <button type="button" class="window-btn btn-minimize" aria-label="Minimize terminal window">&#8211;</button>
                            <button type="button" class="window-btn btn-close" aria-label="Close terminal window">&#10005;</button>
                        </div>
                    </div>
                    <div class="window-body terminal-window">
                        <div class="terminal-output" id="terminal-output"></div>
                        <div class="terminal-input">
                            <span class="prompt">C:\\Users\\lebasi&gt;</span>
                            <input type="text" id="terminal-input" autocomplete="off" spellcheck="false">
                        </div>
                    </div>
                </div>

                <div class="window" id="window-briefing" data-window="briefing" aria-hidden="true">
                    <div class="window-titlebar">
                        <span class="window-title">LAN Party Briefing</span>
                        <div class="window-controls">
                            <button type="button" class="window-btn btn-minimize" aria-label="Minimize briefing window">&#8211;</button>
                            <button type="button" class="window-btn btn-close" aria-label="Close briefing window">&#10005;</button>
                        </div>
                    </div>
                    <div class="window-body">
                        <div class="briefing-content">
                            <h3>Welcome, Commander lebasi!</h3>
                            <p>The LEBASI squad is primed for a 12-player throwdown.</p>
                            <ul>
                                <li>Lobby opens at 19:00 with retro synthwave.</li>
                                <li>Stations are preloaded with the LEBASI mod pack.</li>
                                <li>Snack Depot: aisle 3, restocked hourly.</li>
                                <li>Prize drops every 2 rounds. Keep an eye on the scoreboard!</li>
                            </ul>
                            <p>Need intel? Launch the Party Terminal for live status.</p>
                        </div>
                    </div>
                </div>

                <div class="window" id="window-scoreboard" data-window="scoreboard" aria-hidden="true">
                    <div class="window-titlebar">
                        <span class="window-title">Scoreboard Monitor</span>
                        <div class="window-controls">
                            <button type="button" class="window-btn btn-minimize" aria-label="Minimize scoreboard window">&#8211;</button>
                            <button type="button" class="window-btn btn-close" aria-label="Close scoreboard window">&#10005;</button>
                        </div>
                    </div>
                    <div class="window-body">
                        <div class="scoreboard-content">
                            <h3>Current Highlights</h3>
                            <ol>
                                <li>Squad Nova vs. Hyper Blitz &mdash; 2:1</li>
                                <li>Capture the Rig &mdash; Next round at 21:00</li>
                                <li>VR chill zone unlocked for top fraggers</li>
                            </ol>
                            <p>Update cadence: every 15 minutes via LAN broadcast.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="start-menu" id="start-menu" aria-hidden="true">
                <div class="start-menu-header">LEBASI XP</div>
                <div class="start-menu-body">
                    <button type="button" class="start-menu-item" data-window="terminal">Command Terminal</button>
                    <button type="button" class="start-menu-item" data-window="briefing">LAN Briefing</button>
                    <button type="button" class="start-menu-item" data-window="scoreboard">Scoreboard Monitor</button>
                </div>
            </div>

            <div class="taskbar" id="taskbar">
                <button type="button" class="start-button" id="start-button" aria-haspopup="true" aria-expanded="false">
                    <span class="start-orb" aria-hidden="true"></span>
                    <span class="start-label">LEBASI</span>
                </button>
                <div class="taskbar-items" id="taskbar-items">
                    <button type="button" class="taskbar-item hidden" data-window="terminal">Command Terminal</button>
                    <button type="button" class="taskbar-item hidden" data-window="briefing">LAN Briefing</button>
                    <button type="button" class="taskbar-item hidden" data-window="scoreboard">Scoreboard</button>
                </div>
                <div class="system-tray">
                    <div class="tray-clock" id="tray-clock">12:00</div>
                </div>
            </div>
        </div>
    </div>

    <script src="assets/script.js"></script>
</body>
</html>
