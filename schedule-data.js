/* Shared timetable data (used by index.html and admin.html). Each slotId is stable so Firestore can override a slot. */
const SEM2_DATA = {
            "title": "AAMT 1-3 SCHEDULE", "subtitle": "2nd Semester · A.Y. 2026 – 2027",
            "courses": [
                {"slotId": "s2_0", "id": "MATH1202", "desc": "Aviation Mathematics", "color": "#3a7bd5", "room": "Aero Room", "days": ["Tue"], "startH": 15, "startM": 0, "endH": 17, "endM": 0},
                {"slotId": "s2_1", "id": "MATH1202", "desc": "Aviation Mathematics", "color": "#3a7bd5", "room": "Aero Room", "days": ["Thu"], "startH": 15, "startM": 0, "endH": 17, "endM": 0},
                {"slotId": "s2_2", "id": "CHEM1201", "desc": "Chemistry for Engineering Technologist", "color": "#2ec27e", "room": "Chem Lab 1", "days": ["Mon"], "startH": 8, "startM": 30, "endH": 10, "endM": 0},
                {"slotId": "s2_3", "id": "CHEM1201", "desc": "Chemistry for Engineering Technologist", "color": "#2ec27e", "room": "Aero Room", "days": ["Mon"], "startH": 10, "startM": 0, "endH": 11, "endM": 0},
                {"slotId": "s2_4", "id": "CHEM1201", "desc": "Chemistry for Engineering Technologist", "color": "#2ec27e", "room": "Chem Lab 1", "days": ["Wed"], "startH": 8, "startM": 30, "endH": 10, "endM": 0},
                {"slotId": "s2_5", "id": "CHEM1201", "desc": "Chemistry for Engineering Technologist", "color": "#2ec27e", "room": "Aero Room", "days": ["Wed"], "startH": 10, "startM": 0, "endH": 11, "endM": 0},
                {"slotId": "s2_6", "id": "CHEM1201", "desc": "Chemistry for Engineering Technologist", "color": "#2ec27e", "room": "Aero Room", "days": ["Fri"], "startH": 10, "startM": 0, "endH": 11, "endM": 0},
                {"slotId": "s2_7", "id": "AMT1210", "desc": "Aircraft Powerplant II", "color": "#e05a9a", "room": "P/P Lab", "days": ["Mon"], "startH": 13, "startM": 0, "endH": 15, "endM": 0},
                {"slotId": "s2_8", "id": "AMT1210", "desc": "Aircraft Powerplant II", "color": "#e05a9a", "room": "Aero Room", "days": ["Mon"], "startH": 16, "startM": 0, "endH": 17, "endM": 0},
                {"slotId": "s2_9", "id": "AMT1210", "desc": "Aircraft Powerplant II", "color": "#e05a9a", "room": "P/P Lab", "days": ["Tue"], "startH": 9, "startM": 0, "endH": 11, "endM": 0},
                {"slotId": "s2_10", "id": "AMT1210", "desc": "Aircraft Powerplant II", "color": "#e05a9a", "room": "P/P Lab", "days": ["Wed"], "startH": 13, "startM": 0, "endH": 15, "endM": 0},
                {"slotId": "s2_11", "id": "AMT1210", "desc": "Aircraft Powerplant II", "color": "#e05a9a", "room": "Aero Room", "days": ["Wed"], "startH": 16, "startM": 0, "endH": 17, "endM": 0},
                {"slotId": "s2_12", "id": "AMT1210", "desc": "Aircraft Powerplant II", "color": "#e05a9a", "room": "Aero Room", "days": ["Fri"], "startH": 16, "startM": 0, "endH": 17, "endM": 0},
                {"slotId": "s2_13", "id": "AMT1209", "desc": "Aircraft Materials Construction and Repair I", "color": "#e8702a", "room": "Fabrication Lab", "days": ["Mon"], "startH": 11, "startM": 0, "endH": 13, "endM": 0},
                {"slotId": "s2_14", "id": "AMT1209", "desc": "Aircraft Materials Construction and Repair I", "color": "#e8702a", "room": "Fabrication Lab", "days": ["Wed"], "startH": 11, "startM": 0, "endH": 13, "endM": 0},
                {"slotId": "s2_15", "id": "AMT1209", "desc": "Aircraft Materials Construction and Repair I", "color": "#e8702a", "room": "Aero Room", "days": ["Wed"], "startH": 17, "startM": 0, "endH": 19, "endM": 0},
                {"slotId": "s2_16", "id": "AMT1209", "desc": "Aircraft Materials Construction and Repair I", "color": "#e8702a", "room": "Fabrication Lab", "days": ["Thu"], "startH": 17, "startM": 0, "endH": 19, "endM": 0},
                {"slotId": "s2_17", "id": "AMT1208", "desc": "Aircraft Landing Gear System", "color": "#9c6ade", "room": "Simulation Lab", "days": ["Tue"], "startH": 17, "startM": 0, "endH": 20, "endM": 0},
                {"slotId": "s2_18", "id": "AMT1208", "desc": "Aircraft Landing Gear System", "color": "#9c6ade", "room": "Aero Room", "days": ["Fri"], "startH": 13, "startM": 0, "endH": 14, "endM": 0},
                {"slotId": "s2_19", "id": "AMT1211", "desc": "Aircraft Maintenance Organization & Management", "color": "#00bcd4", "room": "Aero Room", "days": ["Mon"], "startH": 19, "startM": 0, "endH": 20, "endM": 0},
                {"slotId": "s2_20", "id": "AMT1207", "desc": "Aircraft System", "color": "#ffc107", "room": "Aero Room", "days": ["Mon"], "startH": 17, "startM": 0, "endH": 19, "endM": 0},
                {"slotId": "s2_21", "id": "AMT1207", "desc": "Aircraft System", "color": "#ffc107", "room": "Simulation Lab", "days": ["Tue"], "startH": 11, "startM": 0, "endH": 14, "endM": 0},
                {"slotId": "s2_22", "id": "AMT1207", "desc": "Aircraft System", "color": "#ffc107", "room": "Simulation Lab", "days": ["Thu"], "startH": 11, "startM": 0, "endH": 14, "endM": 0},
                {"slotId": "s2_23", "id": "PATHFIT2", "desc": "Exercise-Based Fitness Activities", "color": "#ff5722", "room": "Covered Court", "days": ["Thu"], "startH": 9, "startM": 0, "endH": 11, "endM": 0},
                {"slotId": "s2_24", "id": "NSTP2", "desc": "National Service Training Program II", "color": "#4caf50", "room": "TBA", "days": ["Sat"], "startH": 7, "startM": 0, "endH": 12, "endM": 0}
            ]
        }

        const SEM1_DATA = {
            "title": "AAMT 1-3 SCHEDULE", "subtitle": "1st Semester · A.Y. 2026 – 2027",
            "courses": [
                { "slotId": "s0", "id": "AMT1106", "desc": "Maintenance Forms and Publications", "room": "Simulation Lab", "color": "#3a7bd5", "days": ["Mon"], "startH": 13, "startM": 0, "endH": 16, "endM": 0 },
                { "slotId": "s1", "id": "AMT1106", "desc": "Maintenance Forms and Publications", "room": "Aero Room", "color": "#3a7bd5", "days": ["Mon"], "startH": 18, "startM": 30, "endH": 20, "endM": 0 },
                { "slotId": "s2", "id": "AMT1106", "desc": "Maintenance Forms and Publications", "room": "Aero Room", "color": "#3a7bd5", "days": ["Wed"], "startH": 18, "startM": 30, "endH": 20, "endM": 0 },
                { "slotId": "s3", "id": "AMT1105", "desc": "Aircraft Powerplant 1", "room": "PP Lab", "color": "#e05a9a", "days": ["Mon"], "startH": 10, "startM": 0, "endH": 13, "endM": 0 },
                { "slotId": "s4", "id": "AMT1105", "desc": "Aircraft Powerplant 1", "room": "Aero Room", "color": "#e05a9a", "days": ["Tue"], "startH": 16, "startM": 0, "endH": 17, "endM": 30 },
                { "slotId": "s5", "id": "AMT1105", "desc": "Aircraft Powerplant 1", "room": "PP Lab", "color": "#e05a9a", "days": ["Wed"], "startH": 14, "startM": 0, "endH": 17, "endM": 0 },
                { "slotId": "s6", "id": "AMT1105", "desc": "Aircraft Powerplant 1", "room": "Aero Room", "color": "#e05a9a", "days": ["Thu"], "startH": 16, "startM": 0, "endH": 17, "endM": 30 },
                { "slotId": "s7", "id": "DRAW1101", "desc": "Aircraft Drawing", "room": "DR1", "color": "#2ec27e", "days": ["Tue"], "startH": 9, "startM": 0, "endH": 12, "endM": 0 },
                { "slotId": "s8", "id": "AMT1104", "desc": "Aircraft Handtools and Equipment", "room": "Aero Room", "color": "#e8702a", "days": ["Tue"], "startH": 18, "startM": 0, "endH": 19, "endM": 0 },
                { "slotId": "s9", "id": "AMT1104", "desc": "Aircraft Handtools and Equipment", "room": "Fabrication Lab", "color": "#e8702a", "days": ["Thu"], "startH": 10, "startM": 0, "endH": 13, "endM": 0 },
                { "slotId": "s10", "id": "AMT1103", "desc": "Aircraft Propeller", "room": "P/P Lab", "color": "#9c6ade", "days": ["Tue"], "startH": 13, "startM": 30, "endH": 15, "endM": 0 },
                { "slotId": "s11", "id": "AMT1103", "desc": "Aircraft Propeller", "room": "Aero Room", "color": "#9c6ade", "days": ["Thu"], "startH": 18, "startM": 0, "endH": 19, "endM": 0 },
                { "slotId": "s12", "id": "AMT1103", "desc": "Aircraft Propeller", "room": "P/P Lab", "color": "#9c6ade", "days": ["Thu"], "startH": 13, "startM": 30, "endH": 15, "endM": 0 },
                { "slotId": "s13", "id": "AMT1101", "desc": "Aviation Safety", "room": "Aero Room", "color": "#00bcd4", "days": ["Tue"], "startH": 15, "startM": 0, "endH": 16, "endM": 0 },
                { "slotId": "s14", "id": "AMT1101", "desc": "Aviation Safety", "room": "Aero Room", "color": "#00bcd4", "days": ["Thu"], "startH": 15, "startM": 0, "endH": 16, "endM": 0 },
                { "slotId": "s15", "id": "AMT1102", "desc": "Aircraft Flight Control", "room": "Hangar Table 1", "color": "#ff5722", "days": ["Tue"], "startH": 19, "startM": 0, "endH": 20, "endM": 30 },
                { "slotId": "s16", "id": "AMT1102", "desc": "Aircraft Flight Control", "room": "Hangar Table 1", "color": "#ff5722", "days": ["Thu"], "startH": 19, "startM": 0, "endH": 20, "endM": 30 },
                { "slotId": "s17", "id": "AMT1102", "desc": "Aircraft Flight Control", "room": "Aero Room", "color": "#ff5722", "days": ["Fri"], "startH": 18, "startM": 0, "endH": 19, "endM": 0 },
                { "slotId": "s18", "id": "GEC1106", "desc": "Mathematics in the Modern World", "room": "Aero Room", "color": "#4caf50", "days": ["Mon"], "startH": 17, "startM": 0, "endH": 18, "endM": 0 },
                { "slotId": "s19", "id": "GEC1106", "desc": "Mathematics in the Modern World", "room": "Aero Room", "color": "#4caf50", "days": ["Wed"], "startH": 17, "startM": 0, "endH": 18, "endM": 0 },
                { "slotId": "s20", "id": "GEC1106", "desc": "Mathematics in the Modern World", "room": "Aero Room", "color": "#4caf50", "days": ["Fri"], "startH": 17, "startM": 0, "endH": 18, "endM": 0 },
                { "slotId": "s21", "id": "PATHFIT1", "desc": "Movement Competency Training", "room": "Gymnasium", "color": "#ffc107", "days": ["Wed"], "startH": 12, "startM": 0, "endH": 14, "endM": 0 },
                { "slotId": "s22", "id": "ROTC", "desc": "Reserve Officers' Training Corps", "room": "Covered Court", "color": "#556B2F", "days": ["Sat"], "startH": 7, "startM": 0, "endH": 12, "endM": 0 }
            ]
        }
