# Assistant Phonétique — Angular

Application Angular full client (aucun serveur requis) pour assembler des phonèmes IPA
et les écouter via deux moteurs audio.

## Démarrage rapide

```bash
npm install
npm start          # http://localhost:4200
npm run build      # build production dans dist/
```

## Moteurs audio

### Web Speech API (par défaut)
- ✅ Aucune clé, aucun coût, fonctionne hors ligne
- ✅ Natif dans Chrome, Edge, Safari
- ⚠️ Qualité variable selon le navigateur/OS
- Supporte les phonèmes IPA via balises SSML `<phoneme>`

### Azure Neural TTS (haute qualité)
1. Créer une ressource Speech sur https://portal.azure.com
   - Type : **Speech Services**, Région : **France Central**, Tarif : **F0 (gratuit)**
2. Copier la clé et la saisir dans ⚙ Paramètres de l'app
3. **Pour une app publique** : restreindre la clé à ton domaine dans Azure :
   `Ressource Speech → Réseau → Autoriser uniquement les domaines suivants`

| Voix              | Genre | Description              |
|-------------------|-------|--------------------------|
| DeniseNeural      | F     | Par défaut, naturelle    |
| HenriNeural       | M     | Voix masculine claire    |
| EloiseNeural      | F     | Voix enfant              |
| YvetteNeural      | F     | Alternative féminine     |
| RemyMultilingual  | M     | Multilingue              |

## Architecture

```
src/app/
├── models/
│   └── phoneme.model.ts          ← alphabet IPA + types
├── services/
│   ├── web-speech.service.ts     ← moteur Web Speech API
│   ├── azure-speech.service.ts   ← moteur Azure Neural TTS
│   └── tts.service.ts            ← façade unifiée (signals Angular)
└── components/
    ├── engine-switch/             ← toggle Web Speech / Azure
    ├── settings-modal/            ← config clé Azure
    ├── phoneme-keyboard/          ← clavier IPA cliquable
    └── word-builder/              ← assemblage + lecture
```

## Notes

- La clé Azure est stockée dans `localStorage` (chiffrée côté navigateur)
- Les deux modes sont disponibles : **mot entier** et **phonème par phonème**
- Le SSML généré est affiché en temps réel dans l'interface
- Support light/dark mode automatique via `prefers-color-scheme`
