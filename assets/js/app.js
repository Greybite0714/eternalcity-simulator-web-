// Base Stat Table (Level 1 to 160)
        const BaseStatTable = {
            1: 5, 2: 10, 3: 15, 4: 20, 5: 25, 6: 30, 7: 35, 8: 40, 9: 45, 10: 50,
            11: 55, 12: 60, 13: 65, 14: 70, 15: 75, 16: 80, 17: 85, 18: 90, 19: 95, 20: 100,
            21: 105, 22: 110, 23: 115, 24: 120, 25: 125, 26: 130, 27: 135, 28: 140, 29: 145, 30: 150,
            31: 156, 32: 161, 33: 166, 34: 171, 35: 176, 36: 181, 37: 186, 38: 191, 39: 196, 40: 201,
            41: 208, 42: 213, 43: 218, 44: 223, 45: 228, 46: 233, 47: 238, 48: 243, 49: 248, 50: 253,
            51: 261, 52: 266, 53: 271, 54: 276, 55: 281, 56: 286, 57: 291, 58: 296, 59: 301, 60: 306,
            61: 315, 62: 320, 63: 325, 64: 330, 65: 335, 66: 340, 67: 345, 68: 350, 69: 355, 70: 360,
            71: 370, 72: 375, 73: 380, 74: 385, 75: 390, 76: 395, 77: 400, 78: 405, 79: 410, 80: 415,
            81: 426, 82: 431, 83: 436, 84: 441, 85: 446, 86: 451, 87: 456, 88: 461, 89: 466, 90: 471,
            91: 483, 92: 488, 93: 493, 94: 498, 95: 503, 96: 508, 97: 513, 98: 518, 99: 523, 100: 528,
            101: 541, 102: 546, 103: 551, 104: 556, 105: 561, 106: 566, 107: 571, 108: 576, 109: 581, 110: 586,
            111: 600, 112: 605, 113: 610, 114: 615, 115: 620, 116: 625, 117: 630, 118: 635, 119: 640, 120: 645,
            121: 660, 122: 665, 123: 670, 124: 675, 125: 680, 126: 685, 127: 690, 128: 695, 129: 700, 130: 705,
            131: 721, 132: 726, 133: 731, 134: 736, 135: 741, 136: 746, 137: 751, 138: 756, 139: 761, 140: 766,
            141: 783, 142: 788, 143: 793, 144: 798, 145: 803, 146: 808, 147: 813, 148: 818, 149: 823, 150: 828,
            151: 846, 152: 851, 153: 856, 154: 861, 155: 866, 156: 871, 157: 876, 158: 881, 159: 886, 160: 891
        };

        // Reborn Bonus Stat Table
        const RebornStatTable = {
            105: 5, 106: 5, 107: 5, 108: 7, 109: 7, 110: 7, 111: 9, 112: 9, 113: 9, 114: 11,
            115: 11, 116: 11, 117: 13, 118: 13, 119: 13, 120: 15, 121: 15, 122: 15, 123: 17, 124: 17,
            125: 17, 126: 19, 127: 19, 128: 19, 129: 21, 130: 21, 131: 21, 132: 23, 133: 23, 134: 23,
            135: 25, 136: 25, 137: 25, 138: 27, 139: 27, 140: 27, 141: 29, 142: 29, 143: 29, 144: 31,
            145: 31, 146: 31, 147: 31, 148: 31, 149: 31, 150: 31, 151: 31, 152: 31, 153: 31, 154: 31,
            155: 31, 156: 31, 157: 31, 158: 31, 159: 31, 160: 31
        };

        // Helper parsers
        function getVal(id) {
            const el = document.getElementById(id);
            if (!el) return 0;
            if (el.type === 'checkbox') return el.checked;
            const cleanVal = String(el.value).replace(/,/g, '').replace(/%/g, '').trim();
            const val = parseFloat(cleanVal);
            return isNaN(val) ? 0 : val;
        }

        function setVal(id, val) {
            const el = document.getElementById(id);
            if (!el) return;
            if (el.type === 'checkbox') {
                el.checked = Boolean(val);
            } else {
                el.value = val;
            }
        }

        function sumValues(ids) {
            return ids.reduce((acc, id) => acc + getVal(id), 0);
        }

        // Main Simulation Calculation Engine
        function calculateAll() {
            // 1. Level & Total Stat Calculation
            const currentLevel = Math.min(160, Math.max(1, getVal('txtCurrentLevel')));
            const baseStat = BaseStatTable[currentLevel] || 5;

            const rebornLevels = [
                getVal('txtReborn1'), getVal('txtReborn2'), getVal('txtReborn3'),
                getVal('txtReborn4'), getVal('txtReborn5'), getVal('txtReborn6'),
                getVal('txtReborn7'), getVal('txtReborn8'), getVal('txtReborn9'), getVal('txtReborn10')
            ];

            let rebornStatSum = 0;
            rebornLevels.forEach(lvl => {
                if (lvl > 104 && RebornStatTable[lvl]) {
                    rebornStatSum += RebornStatTable[lvl];
                }
            });

            const totalStat = baseStat + rebornStatSum + 30;
            setVal('txtTotalStat', totalStat);

            const statHp = getVal('txtStatHp');
            const statHealth = getVal('txtStatHealth');
            const statStamina = getVal('txtStatStamina');
            const statSkill = getVal('txtStatSkill');
            const statInt = getVal('txtStatInt');
            const statSpeed = getVal('txtStatSpeed');

            const allocatedSum = statHp + statHealth + statStamina + statSkill + statInt + statSpeed;
            const remainStat = totalStat - allocatedSum;
            
            const txtRemainStat = document.getElementById('txtRemainStat');
            const boxRemainStat = document.getElementById('boxRemainStat');
            txtRemainStat.value = remainStat;
            
            if (remainStat < 0) {
                txtRemainStat.className = "bg-transparent border-0 font-bold text-rose-400 text-right w-16 focus:outline-none animate-pulse";
                boxRemainStat.className = "bg-rose-950/40 p-2 rounded-lg border border-rose-800 flex justify-between items-center";
            } else {
                txtRemainStat.className = "bg-transparent border-0 font-bold text-sky-400 text-right w-16 focus:outline-none";
                boxRemainStat.className = "bg-slate-900 p-2 rounded-lg border border-slate-800 flex justify-between items-center";
            }

            // 2. Armor Subtotals
            const armorDef = sumValues(['txtCapDef', 'txtCoatDef', 'txtWigDef', 'txtShirtDef', 'txtPantsDef', 'txtUnderDef', 'txtShoesDef', 'txtShieldDef']);
            const armorEvasion = sumValues(['txtCapEvasion', 'txtCoatEvasion', 'txtWigEvasion', 'txtShirtEvasion', 'txtPantsEvasion', 'txtUnderEvasion', 'txtShoesEvasion', 'txtShieldEvasion']);
            const armorCrit = sumValues(['txtCapCrit', 'txtCoatCrit', 'txtWigCrit', 'txtShirtCrit', 'txtPantsCrit', 'txtUnderCrit', 'txtShoesCrit', 'txtShieldCrit']);
            const armorAtkPer = sumValues(['txtCapAtkPer', 'txtCoatAtkPer', 'txtWigAtkPer', 'txtShirtAtkPer', 'txtPantsAtkPer', 'txtUnderAtkPer', 'txtShoesAtkPer', 'txtShieldAtkPer']);
            const armorHp = sumValues(['txtCapHp', 'txtCoatHp', 'txtWigHp', 'txtShirtHp', 'txtPantsHp', 'txtUnderHp', 'txtShoesHp', 'txtShieldHp']);

            setVal('txtArmorSubDef', armorDef);
            setVal('txtArmorSubEvasion', armorEvasion);
            setVal('txtArmorSubCrit', armorCrit);
            setVal('txtArmorSubAtkPer', armorAtkPer);
            setVal('txtArmorSubHp', armorHp);

            // 3. Accessory Subtotals
            const accDef = sumValues(['txtAccRebornDef', 'txtAccToyDef', 'txtAccTaroDef', 'txtAccEarDef', 'txtAccNeckDef', 'txtAccBracDef', 'txtAccBeltDef', 'txtAccRingLeftDef', 'txtAccRingRightDef']);
            const accEvasion = sumValues(['txtAccRebornEvasion', 'txtAccToyEvasion', 'txtAccTaroEvasion', 'txtAccEarEvasion', 'txtAccNeckEvasion', 'txtAccBracEvasion', 'txtAccBeltEvasion', 'txtAccRingLeftEvasion', 'txtAccRingRightEvasion']);
            const accCrit = sumValues(['txtAccRebornCrit', 'txtAccToyCrit', 'txtAccTaroCrit', 'txtAccEarCrit', 'txtAccNeckCrit', 'txtAccBracCrit', 'txtAccBeltCrit', 'txtAccRingLeftCrit', 'txtAccRingRightCrit']);
            const accAtkPer = sumValues(['txtAccRebornAtkPer', 'txtAccToyAtkPer', 'txtAccTaroAtkPer', 'txtAccEarAtkPer', 'txtAccNeckAtkPer', 'txtAccBracAtkPer', 'txtAccBeltAtkPer', 'txtAccRingLeftAtkPer', 'txtAccRingRightAtkPer']);
            const accHp = sumValues(['txtAccRebornHp', 'txtAccToyHp', 'txtAccTaroHp', 'txtAccEarHp', 'txtAccNeckHp', 'txtAccBracHp', 'txtAccBeltHp', 'txtAccRingLeftHp', 'txtAccRingRightHp']);

            setVal('txtAccSubDef', accDef);
            setVal('txtAccSubEvasion', accEvasion);
            setVal('txtAccSubCrit', accCrit);
            setVal('txtAccSubAtkPer', accAtkPer);
            setVal('txtAccSubHp', accHp);

            // 4. Costume & Wings
            const costumeDefPer = getVal('txtCostumeDefPer') + getVal('txtWingDefPer');
            const costumeEvasion = getVal('txtCostumeEvasion') + getVal('txtWingEvasion');
            const costumeCrit = getVal('txtCostumeCrit') + getVal('txtWingCrit');
            const costumeAtkPer = getVal('txtCostumeAtkPer') + getVal('txtWingAtkPer');
            const costumeHp = getVal('txtCostumeHp') + getVal('txtWingHp');

            // 5. Total Combined Equipment Values
            const totalDef = armorDef + accDef;
            const totalEvasion = armorEvasion + accEvasion + costumeEvasion;
            const totalCrit = armorCrit + accCrit + costumeCrit;
            const totalAtkPer = armorAtkPer + accAtkPer + costumeAtkPer;
            const totalHp = armorHp + accHp + costumeHp;

            setVal('txtTotalDef', totalDef);
            setVal('txtTotalEvasion', totalEvasion);
            setVal('txtTotalCrit', totalCrit);
            setVal('txtTotalAtkPer', totalAtkPer);
            setVal('txtTotalHp', totalHp);

            // 6. Attack Calculation
            const race = document.getElementById('cmbRace').value;
            const weaponType = document.getElementById('cmbWeaponType').value;
            const weaponDmg = getVal('txtWeaponDmg');
            const weaponCrit = getVal('txtWeaponCrit');

            const atkUnlock = getVal('txtAtkUnlock');
            const atkAchieve = getVal('txtAtkAchieve');
            const defUnlock = getVal('txtDefUnlock');
            const defAchieve = getVal('txtDefAchieve');
            const hpUnlock = getVal('txtHpUnlock');
            const hpAchieve = getVal('txtHpAchieve');

            const isAtkAmp = getVal('chkAtkAmp');
            const isDefAmp = getVal('chkDefAmp');
            const isPremDef = getVal('chkPremDef');
            const isHouseAtk = getVal('chkHouseAtk');
            const isHouseDef = getVal('chkHouseDef');
            const isHouseHp = getVal('chkHouseHp');
            const isHpBuff1000 = getVal('chkHpBuff1000');
            const isHpBuff2000 = getVal('chkHpBuff2000');
            const champAtkBuff = getVal('txtChampAtkBuff');

            const totalAtkBonusPer = totalAtkPer + champAtkBuff;
            const mainStat = (weaponType === '원거리') ? statSkill : statHealth;

            let finalAtk = (weaponDmg * (1.0 + (mainStat / 100.0)) + mainStat)
                            * (1.0 + (totalAtkBonusPer / 100.0))
                            * (1.0 + (atkUnlock / 100.0))
                            * (1.0 + (atkAchieve / 100.0));

            if (isAtkAmp) finalAtk *= 1.2;
            if (isHouseAtk) finalAtk *= 1.05;
            if (race === '변이') finalAtk *= 1.3;

            // 7. Defense Calculation
            const baseDef = totalDef;
            const baseDef2 = Math.floor(baseDef * (1.0 + (statStamina / 100.0)));
            let finalDef = baseDef2 * (1.0 + (costumeDefPer / 100.0)) * (1.0 + (defUnlock / 100.0)) * (1.0 + (defAchieve / 100.0));

            if (isDefAmp) finalDef *= 1.2;
            if (isPremDef) finalDef *= 1.2;
            if (isHouseDef) finalDef *= 1.05;

            // 8. HP Calculation
            const levelBonusHp = currentLevel * 3;
            let baseHpFromStat = ((currentLevel - 1) + (statHealth - 5)) * 9 + 154 + levelBonusHp;

            if (race === '변이') {
                baseHpFromStat *= 0.7;
            }

            let calculatedHp = (baseHpFromStat + totalHp)
                                * (1.0 + (hpUnlock / 100.0))
                                * (1.0 + (hpAchieve / 100.0));

            if (isHouseHp) calculatedHp += 500;
            if (isHpBuff1000) calculatedHp += 1000;
            if (isHpBuff2000) calculatedHp += 2000;

            const finalHp = calculatedHp;

            // 9. Auxiliary Stats
            const rawEvasion = (totalEvasion / 10.0) * (1.0 + (statSpeed / 100.0)) + (statSpeed / 10.0) + 1;
            const finalEvasion = Math.min(50, Math.floor(rawEvasion));

            const rawCrit = 1 + (weaponCrit / 5.0) * (1.0 + (statSkill / 100.0)) + totalCrit;
            const finalCrit = Math.min(50, Math.floor(rawCrit));

            let recovery = 0;
            if (statHp >= 9) {
                recovery = Math.min(50, (Math.floor(Math.sqrt(statHp)) - 2) * 5);
            }

            const skillRank = Math.floor((currentLevel + statInt * 2) / 3);

            // 10. Update Dashboard Outputs
            setVal('txtResultAtk', Math.round(finalAtk).toLocaleString());
            setVal('txtResultDef', Math.round(finalDef).toLocaleString());
            setVal('txtResultHp', Math.round(finalHp).toLocaleString());

            setVal('txtResultEvasion', finalEvasion + '%');
            setVal('txtResultCrit', finalCrit + '%');
            setVal('txtResultRecovery', recovery);

            setVal('txtResultSkillRank', skillRank);
        }

        // Auto Distribute Main Stat Helper
        function autoDistributeMainStat() {
            const currentLevel = Math.min(160, Math.max(1, getVal('txtCurrentLevel')));
            const baseStat = BaseStatTable[currentLevel] || 5;

            const rebornLevels = [
                getVal('txtReborn1'), getVal('txtReborn2'), getVal('txtReborn3'),
                getVal('txtReborn4'), getVal('txtReborn5'), getVal('txtReborn6'),
                getVal('txtReborn7'), getVal('txtReborn8'), getVal('txtReborn9'), getVal('txtReborn10')
            ];

            let rebornStatSum = 0;
            rebornLevels.forEach(lvl => {
                if (lvl > 104 && RebornStatTable[lvl]) {
                    rebornStatSum += RebornStatTable[lvl];
                }
            });

            const totalStat = baseStat + rebornStatSum + 30;

            // Reset base stats to 5
            setVal('txtStatHp', 5);
            setVal('txtStatHealth', 5);
            setVal('txtStatStamina', 5);
            setVal('txtStatSkill', 5);
            setVal('txtStatInt', 5);
            setVal('txtStatSpeed', 5);

            const remaining = totalStat - 30; // 5 * 6 = 30 used
            const weaponType = document.getElementById('cmbWeaponType').value;

            if (weaponType === '원거리') {
                const addSkill = Math.min(595, remaining);
                setVal('txtStatSkill', 5 + addSkill);
            } else {
                const addHealth = Math.min(595, remaining);
                setVal('txtStatHealth', 5 + addHealth);
            }

            calculateAll();
        }

        // Profile Management System
        const STORAGE_KEY = 'eternal_city_sim_profiles';

        function getAllProfiles() {
            try {
                const data = localStorage.getItem(STORAGE_KEY);
                return data ? JSON.parse(data) : {};
            } catch (e) {
                return {};
            }
        }

        function saveAllProfiles(profiles) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
            refreshProfileDropdown();
        }

        function getCurrentInputsState() {
            const inputs = document.querySelectorAll('input, select');
            const state = {};
            inputs.forEach(el => {
                if (!el.id || el.readOnly || el.id === 'txtProfileName') return;
                if (el.type === 'checkbox') {
                    state[el.id] = el.checked;
                } else {
                    state[el.id] = el.value;
                }
            });
            return state;
        }

        function saveProfile() {
            const nameInput = document.getElementById('txtProfileName');
            const profileName = nameInput.value.trim();
            if (!profileName) return;

            const profiles = getAllProfiles();
            profiles[profileName] = getCurrentInputsState();
            saveAllProfiles(profiles);

            document.getElementById('cmbProfiles').value = profileName;
        }

        function loadProfile() {
            const select = document.getElementById('cmbProfiles');
            const profileName = select.value;
            if (!profileName) return;

            const profiles = getAllProfiles();
            const state = profiles[profileName];
            if (!state) return;

            Object.keys(state).forEach(id => {
                setVal(id, state[id]);
            });

            document.getElementById('txtProfileName').value = profileName;
            calculateAll();
        }

        function deleteProfile() {
            const select = document.getElementById('cmbProfiles');
            const profileName = select.value;
            if (!profileName) return;

            const profiles = getAllProfiles();
            delete profiles[profileName];
            saveAllProfiles(profiles);
        }

        function refreshProfileDropdown() {
            const select = document.getElementById('cmbProfiles');
            const compareA = document.getElementById('cmbCompareA');
            const compareB = document.getElementById('cmbCompareB');

            const profiles = getAllProfiles();
            const keys = Object.keys(profiles);

            select.innerHTML = '';
            compareA.innerHTML = '';
            compareB.innerHTML = '';

            if (keys.length === 0) {
                select.innerHTML = '<option value="">(저장된 세팅 없음)</option>';
                compareA.innerHTML = '<option value="">(선택 안함)</option>';
                compareB.innerHTML = '<option value="">(선택 안함)</option>';
                return;
            }

            keys.forEach(k => {
                const opt1 = new Option(k, k);
                const opt2 = new Option(k, k);
                const opt3 = new Option(k, k);
                select.add(opt1);
                compareA.add(opt2);
                compareB.add(opt3);
            });

            if (keys.length > 1) {
                compareB.selectedIndex = 1;
            }
        }

        function onProfileSelectChange() {
            const name = document.getElementById('cmbProfiles').value;
            if (name) {
                document.getElementById('txtProfileName').value = name;
            }
        }

        // JSON Import / Export System
        function exportDataJSON() {
            const modal = document.getElementById('jsonModal');
            const txt = document.getElementById('txtJsonData');
            const title = document.getElementById('jsonModalTitle');
            const desc = document.getElementById('jsonModalDesc');
            const actions = document.getElementById('jsonModalActions');

            title.innerHTML = '<i class="fa-solid fa-file-export text-sky-400"></i> 세팅 데이터 내보내기';
            desc.innerText = '현재 세팅 데이터(JSON 문자열)입니다. 복사하여 공유하거나 백업하세요.';

            const state = getCurrentInputsState();
            txt.value = JSON.stringify(state, null, 2);

            actions.innerHTML = `
                <button onclick="copyJsonToClipboard()" class="px-4 py-1.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg text-xs transition">
                    <i class="fa-solid fa-copy mr-1"></i> 클립보드 복사
                </button>
                <button onclick="closeJsonModal()" class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-lg text-xs border border-slate-700">
                    닫기
                </button>
            `;

            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }

        function importDataJSON() {
            const modal = document.getElementById('jsonModal');
            const txt = document.getElementById('txtJsonData');
            const title = document.getElementById('jsonModalTitle');
            const desc = document.getElementById('jsonModalDesc');
            const actions = document.getElementById('jsonModalActions');

            title.innerHTML = '<i class="fa-solid fa-file-import text-emerald-400"></i> 세팅 데이터 불러오기';
            desc.innerText = '공유받은 세팅 데이터(JSON 문자열)를 아래에 붙여넣고 적용하세요.';
            txt.value = '';

            actions.innerHTML = `
                <button onclick="applyImportedJSON()" class="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition">
                    <i class="fa-solid fa-check mr-1"></i> 세팅 적용
                </button>
                <button onclick="closeJsonModal()" class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-lg text-xs border border-slate-700">
                    취소
                </button>
            `;

            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }

        function copyJsonToClipboard() {
            const txt = document.getElementById('txtJsonData');
            txt.select();
            document.execCommand('copy');
            alert('클립보드에 세팅 코드가 복사되었습니다.');
        }

        function applyImportedJSON() {
            const txt = document.getElementById('txtJsonData').value.trim();
            if (!txt) return;

            try {
                const state = JSON.parse(txt);
                Object.keys(state).forEach(id => {
                    setVal(id, state[id]);
                });
                calculateAll();
                closeJsonModal();
                alert('세팅 데이터를 성공적으로 적용했습니다!');
            } catch (e) {
                alert('유효하지 않은 세팅 JSON 형식입니다.');
            }
        }

        function closeJsonModal() {
            const modal = document.getElementById('jsonModal');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }

        // Full Reset Handler
        function resetAll() {
            setVal('txtCurrentLevel', 1);
            for (let i = 1; i <= 10; i++) {
                setVal('txtReborn' + i, 0);
            }

            setVal('txtStatHp', 5);
            setVal('txtStatHealth', 5);
            setVal('txtStatStamina', 5);
            setVal('txtStatSkill', 5);
            setVal('txtStatInt', 5);
            setVal('txtStatSpeed', 5);

            const cmbRace = document.getElementById('cmbRace');
            if (cmbRace) cmbRace.value = '휴먼';
            setVal('txtAtkUnlock', 0);
            setVal('txtAtkAchieve', 0);
            setVal('txtDefUnlock', 0);
            setVal('txtDefAchieve', 0);
            setVal('txtHpUnlock', 0);
            setVal('txtHpAchieve', 0);

            setVal('chkAtkAmp', false);
            setVal('chkDefAmp', false);
            setVal('chkHouseAtk', false);
            setVal('chkHouseDef', false);
            setVal('chkHouseHp', false);
            setVal('chkPremDef', false);
            setVal('chkHpBuff1000', false);
            setVal('chkHpBuff2000', false);
            setVal('txtChampAtkBuff', 0);

            const cmbWeaponType = document.getElementById('cmbWeaponType');
            if (cmbWeaponType) cmbWeaponType.value = '원거리';
            const cmbWeaponSize = document.getElementById('cmbWeaponSize');
            if (cmbWeaponSize) cmbWeaponSize.value = '중형';
            setVal('txtWeaponDmg', 0);
            setVal('txtWeaponCrit', 0);

            const armorIds = ['Cap', 'Coat', 'Wig', 'Shirt', 'Pants', 'Under', 'Shoes', 'Shield'];
            const armorFields = ['Def', 'Evasion', 'Crit', 'AtkPer', 'Hp'];
            armorIds.forEach(id => {
                armorFields.forEach(f => setVal('txt' + id + f, ''));
            });

            const accIds = ['AccReborn', 'AccToy', 'AccTaro', 'AccEar', 'AccNeck', 'AccBrac', 'AccBelt', 'RingLeft', 'RingRight'];
            accIds.forEach(id => {
                armorFields.forEach(f => setVal('txt' + id + f, ''));
            });

            const costumeIds = ['CostumeDefPer', 'CostumeEvasion', 'CostumeCrit', 'CostumeAtkPer', 'CostumeHp', 'WingDefPer', 'WingEvasion', 'WingCrit', 'WingAtkPer', 'WingHp'];
            costumeIds.forEach(id => setVal('txt' + id, ''));

            setVal('txtProfileName', '기본세팅');

            calculateAll();
        }

        // Comparison Modal Operations
        function openCompareModal() {
            refreshProfileDropdown();
            document.getElementById('compareModal').classList.remove('hidden');
            document.getElementById('compareModal').classList.add('flex');
            updateComparison();
        }

        function closeCompareModal() {
            document.getElementById('compareModal').classList.add('hidden');
            document.getElementById('compareModal').classList.remove('flex');
        }

        function calculateProfileState(state) {
            const original = getCurrentInputsState();
            Object.keys(state).forEach(id => setVal(id, state[id]));
            calculateAll();

            const getRawStr = (id) => {
                const el = document.getElementById(id);
                return el ? el.value : '0';
            };

            const result = {
                atk: getRawStr('txtResultAtk'),
                def: getRawStr('txtResultDef'),
                hp: getRawStr('txtResultHp'),
                evasion: getRawStr('txtResultEvasion'),
                crit: getRawStr('txtResultCrit'),
                recovery: getRawStr('txtResultRecovery'),
                skillRank: getRawStr('txtResultSkillRank')
            };

            Object.keys(original).forEach(id => setVal(id, original[id]));
            calculateAll();
            return result;
        }

        function updateComparison() {
            const profiles = getAllProfiles();
            const nameA = document.getElementById('cmbCompareA').value;
            const nameB = document.getElementById('cmbCompareB').value;
            const container = document.getElementById('compareResultTable');

            if (!nameA || !nameB || !profiles[nameA] || !profiles[nameB]) {
                container.innerHTML = '<div class="text-center py-6 text-slate-500 font-medium">비교 분석할 저장된 세팅 프로필 2개를 선택해 주세요.</div>';
                return;
            }

            const resA = calculateProfileState(profiles[nameA]);
            const resB = calculateProfileState(profiles[nameB]);

            const parseNum = (val) => parseFloat(String(val).replace(/,/g, '').replace(/%/g, '')) || 0;

            const formatDiff = (vA, vB, isPercent = false) => {
                const diff = parseNum(vB) - parseNum(vA);
                const suffix = isPercent ? '%' : '';
                if (diff > 0) return `<span class="text-emerald-400 font-bold">+${diff.toLocaleString()}${suffix} ▲</span>`;
                if (diff < 0) return `<span class="text-rose-400 font-bold">${diff.toLocaleString()}${suffix} ▼</span>`;
                return `<span class="text-slate-500">동일</span>`;
            };

            container.innerHTML = `
                <table class="w-full text-center text-xs border-collapse">
                    <thead>
                        <tr class="bg-slate-900 border-b border-slate-800 text-slate-400">
                            <th class="p-2 text-left pl-3">스탯 항목</th>
                            <th class="p-2 text-sky-400">${nameA} (A)</th>
                            <th class="p-2 text-amber-400">${nameB} (B)</th>
                            <th class="p-2">수치 차이 (B - A)</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-800/80">
                        <tr><td class="p-2.5 font-bold text-left pl-3 text-slate-300">공격력</td><td class="font-bold text-slate-200">${resA.atk}</td><td class="font-bold text-slate-200">${resB.atk}</td><td>${formatDiff(resA.atk, resB.atk)}</td></tr>
                        <tr><td class="p-2.5 font-bold text-left pl-3 text-slate-300">방어력</td><td class="font-bold text-slate-200">${resA.def}</td><td class="font-bold text-slate-200">${resB.def}</td><td>${formatDiff(resA.def, resB.def)}</td></tr>
                        <tr><td class="p-2.5 font-bold text-left pl-3 text-slate-300">체력 (HP)</td><td class="font-bold text-slate-200">${resA.hp}</td><td class="font-bold text-slate-200">${resB.hp}</td><td>${formatDiff(resA.hp, resB.hp)}</td></tr>
                        <tr><td class="p-2.5 font-bold text-left pl-3 text-slate-300">회피율</td><td class="font-bold text-slate-200">${resA.evasion}</td><td class="font-bold text-slate-200">${resB.evasion}</td><td>${formatDiff(resA.evasion, resB.evasion, true)}</td></tr>
                        <tr><td class="p-2.5 font-bold text-left pl-3 text-slate-300">치명율</td><td class="font-bold text-slate-200">${resA.crit}</td><td class="font-bold text-slate-200">${resB.crit}</td><td>${formatDiff(resA.crit, resB.crit, true)}</td></tr>
                        <tr><td class="p-2.5 font-bold text-left pl-3 text-slate-300">의식회복</td><td class="font-bold text-slate-200">${resA.recovery}</td><td class="font-bold text-slate-200">${resB.recovery}</td><td>${formatDiff(resA.recovery, resB.recovery)}</td></tr>
                        <tr><td class="p-2.5 font-bold text-left pl-3 text-slate-300">기술등급</td><td class="font-bold text-slate-200">${resA.skillRank}</td><td class="font-bold text-slate-200">${resB.skillRank}</td><td>${formatDiff(resA.skillRank, resB.skillRank)}</td></tr>
                    </tbody>
                </table>
            `;
        }

        // Initialization
        window.onload = function() {
            const profiles = getAllProfiles();
            if (Object.keys(profiles).length === 0) {
                profiles['기본 세팅'] = getCurrentInputsState();
                saveAllProfiles(profiles);
            } else {
                refreshProfileDropdown();
            }
            calculateAll();
        };
