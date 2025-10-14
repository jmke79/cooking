document.addEventListener('DOMContentLoaded', () => {
    const screens = {
        bios: document.getElementById('bios-screen'),
        boot: document.getElementById('boot-screen'),
        login: document.getElementById('login-screen'),
        desktop: document.getElementById('desktop-screen')
    };

    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginError = document.getElementById('login-error');
    const loginStatus = document.getElementById('login-status');

    const terminalOutput = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');

    const desktopIcons = document.querySelectorAll('.desktop-icon');
    const startButton = document.getElementById('start-button');
    const startMenu = document.getElementById('start-menu');
    const startMenuItems = document.querySelectorAll('.start-menu-item');
    const windows = Array.from(document.querySelectorAll('.window'));
    const taskbarItems = Array.from(document.querySelectorAll('.taskbar-item'));
    const trayClock = document.getElementById('tray-clock');

    const biosBody = document.getElementById('bios-body');
    const bootMessages = document.getElementById('boot-messages');
    const bootBar = document.getElementById('boot-bar');

    const windowMap = windows.reduce((acc, win) => {
        acc[win.dataset.window] = win;
        return acc;
    }, {});

    const expectedUsername = 'lebasi';
    const expectedPassword = 'Welcome01';

    let activeWindowId = null;
    let terminalBooted = false;
    let clockIntervalId = null;
    let zIndexCounter = 10;

    const showScreen = (name) => {
        Object.values(screens).forEach((screen) => screen.classList.remove('active'));
        screens[name].classList.add('active');
    };

    const biosLines = [
        { text: 'Initializing LEBASI LAN Party BIOS...', accent: true },
        { text: '12-seat rig detector................................ OK' },
        { text: 'Energy drink reserves............................... MAX' },
        { text: 'RGB sync matrix..................................... ONLINE' },
        { text: 'Retro XP boot modules.............................. READY' },
        { text: 'LAN firewalls....................................... PASS' }
    ];

    const bootLineItems = [
        'Loading LEBASI XP kernel extensions...',
        'Configuring 12-player private network...',
        'Mounting snack depot drives...',
        'Priming scoreboard overlay...',
        'Launching LEBASI XP desktop...'
    ];

    const appendBiosLine = ({ text, accent }) => {
        if (!biosBody) return;
        const line = document.createElement('p');
        line.className = accent ? 'bios-line bios-line--accent' : 'bios-line';
        line.textContent = text;
        biosBody.appendChild(line);
    };

    const appendBootMessage = (text) => {
        if (!bootMessages) return;
        const message = document.createElement('p');
        message.className = 'boot-message';
        message.textContent = text;
        bootMessages.appendChild(message);
        requestAnimationFrame(() => {
            message.classList.add('visible');
        });
    };

    const runBiosSequence = () => new Promise((resolve) => {
        if (!biosBody) {
            resolve();
            return;
        }

        biosBody.innerHTML = '';
        let index = 0;

        const nextLine = () => {
            appendBiosLine(biosLines[index]);
            index += 1;
            if (index < biosLines.length) {
                setTimeout(nextLine, 600);
            } else {
                setTimeout(resolve, 700);
            }
        };

        nextLine();
    });

    const runBootSequence = () => new Promise((resolve) => {
        if (!bootMessages || !bootBar) {
            resolve();
            return;
        }

        bootMessages.innerHTML = '';
        bootBar.style.width = '0%';

        let progress = 0;
        let messageIndex = 0;

        const progressInterval = setInterval(() => {
            progress += Math.random() * 18 + 7;
            if (progress >= 100) {
                progress = 100;
            }

            bootBar.style.width = `${progress}%`;

            if (progress >= 100) {
                clearInterval(progressInterval);
                setTimeout(resolve, 600);
            }
        }, 420);

        const pushMessage = () => {
            appendBootMessage(bootLineItems[messageIndex]);
            messageIndex += 1;
            if (messageIndex < bootLineItems.length) {
                setTimeout(pushMessage, 900);
            }
        };

        pushMessage();
    });

    const startBootFlow = async () => {
        showScreen('bios');
        await runBiosSequence();
        showScreen('boot');
        await runBootSequence();
        showScreen('login');
        setTimeout(() => passwordInput.focus(), 200);
    };

    startBootFlow();

    const appendLine = (text = '') => {
        const line = document.createElement('div');
        line.textContent = text;
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    };

    const commandMap = {
        help: () => {
            appendLine('Available commands: help, about, party, status, clear');
        },
        about: () => {
            appendLine('LEBASI: 12 gamers, one night, endless GG.');
            appendLine('Hosting LAN parties since XP ruled the world.');
        },
        party: () => {
            appendLine('Next LAN party checklist:');
            appendLine('- 12 high-octane rigs synced to the same beat');
            appendLine('- Gigabit switches humming at full send');
            appendLine('- Energy drink cache fully stocked');
            appendLine('- Retro soundtrack queued for boot');
        },
        status: () => {
            appendLine('Network: Online | Slots: 12/12 ready');
            appendLine('Terminal uptime: ' + new Date().toLocaleTimeString());
        },
        clear: () => {
            terminalOutput.innerHTML = '';
        }
    };

    const handleCommand = (command) => {
        const normalized = command.trim().toLowerCase();
        appendLine('C:/Users/lebasi> ' + command);

        if (!normalized) {
            return;
        }

        if (commandMap[normalized]) {
            commandMap[normalized]();
        } else {
            appendLine('"' + command + '" is not recognized as an internal or external command.');
        }
    };

    const bootTerminal = () => {
        terminalOutput.innerHTML = '';
        appendLine('Microsoft Windows XP [Version 5.1.2600 - LEBASI Edition]');
        appendLine('(C) LEBASI LAN Collective. All rights reserved.');
        appendLine('');
        appendLine('C:/Users/lebasi>');
        terminalBooted = true;
    };

    const focusTerminal = () => {
        if (terminalInput) {
            setTimeout(() => terminalInput.focus(), 50);
        }
    };

    const getTaskbarItem = (id) => taskbarItems.find((item) => item.dataset.window === id);

    const showTaskbarItem = (id) => {
        const item = getTaskbarItem(id);
        if (item) {
            item.classList.remove('hidden');
        }
    };

    const hideTaskbarItem = (id) => {
        const item = getTaskbarItem(id);
        if (item) {
            item.classList.add('hidden');
            item.classList.remove('active');
        }
    };

    const setTaskbarActive = (id, active) => {
        const item = getTaskbarItem(id);
        if (item) {
            item.classList.toggle('active', active);
        }
    };

    const bringToFront = (win) => {
        zIndexCounter += 1;
        win.style.zIndex = zIndexCounter;
    };

    const setActiveWindow = (id) => {
        activeWindowId = id;
        windows.forEach((win) => {
            const isActive = win.dataset.window === id;
            win.classList.toggle('active-window', isActive);
            setTaskbarActive(win.dataset.window, isActive);
        });
    };

    const openWindow = (id) => {
        const win = windowMap[id];
        if (!win) return;

        showTaskbarItem(id);
        win.classList.add('visible');
        win.setAttribute('aria-hidden', 'false');
        bringToFront(win);
        setActiveWindow(id);
        startMenu.classList.remove('open');
        startMenu.setAttribute('aria-hidden', 'true');
        startButton.setAttribute('aria-expanded', 'false');

        if (id === 'terminal' && !terminalBooted) {
            bootTerminal();
        }

        if (id === 'terminal') {
            focusTerminal();
        }
    };

    const minimizeWindow = (id) => {
        const win = windowMap[id];
        if (!win) return;

        win.classList.remove('visible');
        win.setAttribute('aria-hidden', 'true');
        if (activeWindowId === id) {
            activeWindowId = null;
        }
        win.classList.remove('active-window');
        setTaskbarActive(id, false);
    };

    const closeWindow = (id) => {
        minimizeWindow(id);
        hideTaskbarItem(id);
    };

    const toggleWindowFromTaskbar = (id) => {
        const win = windowMap[id];
        if (!win) return;

        if (win.classList.contains('visible') && activeWindowId === id) {
            minimizeWindow(id);
        } else {
            openWindow(id);
        }
    };

    windows.forEach((win) => {
        const id = win.dataset.window;

        win.addEventListener('mousedown', () => {
            if (!win.classList.contains('visible')) return;
            bringToFront(win);
            setActiveWindow(id);
        });

        const minimizeBtn = win.querySelector('.btn-minimize');
        const closeBtn = win.querySelector('.btn-close');

        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', (event) => {
                event.stopPropagation();
                minimizeWindow(id);
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', (event) => {
                event.stopPropagation();
                closeWindow(id);
            });
        }
    });

    desktopIcons.forEach((icon) => {
        icon.addEventListener('dblclick', () => {
            openWindow(icon.dataset.window);
        });

        icon.addEventListener('click', () => {
            openWindow(icon.dataset.window);
        });
    });

    startMenuItems.forEach((item) => {
        item.addEventListener('click', () => {
            openWindow(item.dataset.window);
        });
    });

    taskbarItems.forEach((item) => {
        item.addEventListener('click', () => {
            toggleWindowFromTaskbar(item.dataset.window);
        });
    });

    startButton.addEventListener('click', (event) => {
        event.stopPropagation();
        const isOpen = startMenu.classList.toggle('open');
        startButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        if (isOpen) {
            startMenu.setAttribute('aria-hidden', 'false');
        } else {
            startMenu.setAttribute('aria-hidden', 'true');
        }
    });

    document.addEventListener('click', (event) => {
        if (
            startMenu.classList.contains('open') &&
            !startMenu.contains(event.target) &&
            !startButton.contains(event.target)
        ) {
            startMenu.classList.remove('open');
            startMenu.setAttribute('aria-hidden', 'true');
            startButton.setAttribute('aria-expanded', 'false');
        }
    });

    const updateClock = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const formatted = `${hours % 12 || 12}:${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
        trayClock.textContent = formatted;
    };

    const showDesktop = () => {
        showScreen('desktop');
        if (clockIntervalId) {
            clearInterval(clockIntervalId);
        }
        updateClock();
        clockIntervalId = setInterval(updateClock, 1000);
        setTimeout(() => openWindow('briefing'), 200);
        setTimeout(() => openWindow('terminal'), 400);
    };

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username.toLowerCase() === expectedUsername && password === expectedPassword) {
            loginError.textContent = '';
            loginStatus.textContent = 'Signing in to the LEBASI desktop...';
            showDesktop();
            setTimeout(() => {
                loginStatus.textContent = '';
            }, 2000);
        } else {
            loginError.textContent = 'Invalid credentials. Hint: check the LAN party welcome phrase!';
            loginStatus.textContent = '';
            passwordInput.value = '';
            passwordInput.focus();
        }
    });

    terminalInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const command = terminalInput.value;
            handleCommand(command);
            terminalInput.value = '';
        }
    });
});
