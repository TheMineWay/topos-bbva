# 💖 Features

Explanation of existing features, decisions made and possible existing features.

## Gameplay

The core gameplay implements the basic 3x3 board and a mole that randomly appears in one hole per round. When a mole is hit, depending on the difficulty level it increases score by 10, 20 or 30 points.

As extra features, the gameplay includes:

- Multi-mole selector: you can increase the number of moles appearing per round (up to 5).
- No hole repetition: moles will try not to appear in the same hole consecutively. If more than 4 moles are active in a 3x3 board there will be always one mole that has to repeat hole. But it will be always the minimum possible repetitions.
- Device vibration on mole hit: if your device supports it, it will vibrate when a mole is hit.
- Records: the game stores your best score so you always know your record.

## Accessibility

For me, it is important to make every project accessible to as many people as possible. To accomplish that, I seriously consider following best a11y practices and guidelines.

Here is a list of what it was considered for accessibility:

- Following HTML semantics.
- Using ARIA roles and attributes when necessary.
- All images have meaningful alt text.
- Ensuring sufficient color contrast.
- Making the application navigable via keyboard.

To avoid missing any important a11y aspect I implemented a e2e test that audits the application (using `@axe-core/playwright`). It tests a11y on all possible themes.

## Internationalization

The application uses `react-i18next` to provide internationalization (i18n) support. Currently, the application supports English and Spanish languages, with the ability to easily add more languages in the future.