# Card2CSV

Card2CSV est un outil permettant de convertir les informations de cartes de visite en fichiers CSV facilement exploitables. Grâce à la reconnaissance optique de caractères (OCR) et au traitement d'images, Card2CSV extrait automatiquement les données importantes comme les noms, adresses emails, numéros de téléphone et adresses postales pour créer des bases de données structurées.

## 🎯 Fonctionnalités

- Numérisation et analyse d'images de cartes de visite
- Extraction automatique des données de contact
- Conversion au format CSV pour import facile dans Excel, Google Sheets ou CRM
- Support pour le traitement par lots de plusieurs cartes
- Interface utilisateur intuitive
- Correction manuelle des données extraites
- Export des données dans différents formats (CSV, Excel, vCard)

## 💻 Technologies

- Frontend : HTML, CSS, JavaScript/TypeScript
- Backend : Node.js
- OCR : Tesseract.js
- Traitement d'image : Sharp/Jimp
- Analyse de données : NLP pour l'extraction d'entités

## 🔧 Installation

### Prérequis

- Node.js (v14.x ou supérieure)
- npm ou yarn

### Étapes d'installation

1. Cloner le dépôt
```bash
git clone https://github.com/techmefr/Card2CSV.git
cd Card2CSV
```

2. Installer les dépendances
```bash
npm install
# ou
yarn
```

3. Lancer l'application
```bash
npm start
# ou
yarn start
```

## 📖 Guide d'utilisation

1. **Importer les images** : Téléchargez les photos ou scans de cartes de visite
2. **Prévisualisation** : Vérifiez la qualité de l'image et recadrez si nécessaire
3. **Extraction** : Lancez l'extraction automatique des données
4. **Édition** : Corrigez ou complétez les données extraites si nécessaire
5. **Export** : Téléchargez vos données au format CSV ou autre format disponible

## 🔜 Fonctionnalités à venir

- Support multilingue pour l'OCR
- Intégration avec des CRM populaires (Salesforce, HubSpot, etc.)
- Application mobile pour la capture et l'extraction instantanée
- Amélioration des algorithmes d'extraction pour une meilleure précision

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Committez vos changements (`git commit -m 'Ajout d'une fonctionnalité'`)
4. Poussez vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

## 📝 License

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Contact

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue sur le dépôt GitHub.

---

© 2025 Card2CSV. Tous droits réservés.
