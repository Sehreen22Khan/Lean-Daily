# Lean Daily

A phone-first web app for losing weight: a daily calorie target, food log, water, home workouts with a timer and voice coach, and a big tap counter for reps. You can talk to it, and Siri can use it. Everything is stored on the phone. No account, no server.

Live site: https://sehreen22khan.github.io/Lean-Daily/

## Talk to it

Tap the green mic and talk normally. For example:

- "Add a glass of water", "I drank 3 glasses"
- "I had 2 rotis and daal", "Half a cup of rice", "Chicken shawarma 450 calories"
- "Add 20 squats", "Switch to push-ups", "One more", "Set the target to 30"
- "Start today's workout". During a workout: "pause", "resume", "skip", "finish"
- "I walked for 30 minutes"
- "My weight is 78.5", "I weigh 172 pounds"
- "How am I doing?", "How many calories are left?"
- "Undo"

On the counter, turn on **Count out loud** and count your reps out loud. In a workout, the mic button at the top lets you say "pause" or "skip" without touching the phone.

If a browser can't do speech, the mic sheet has a text box. The phone keyboard's own dictation mic works there too.

## Siri (iPhone)

Any link with `?cmd=` runs that command when it opens, for example
`https://sehreen22khan.github.io/Lean-Daily/?cmd=add+a+glass+of+water`.
Siri Shortcuts use this. In the Shortcuts app, build a shortcut named **Lean Daily** with these actions:

1. **Dictate Text**
2. **URL Encode**
3. **Text**: `https://sehreen22khan.github.io/Lean-Daily/?cmd=` followed by the *URL Encoded Text* variable
4. **Open URLs**

Then say "Hey Siri, Lean Daily" and tell it what to log. The app has the same steps with copy buttons, plus one-phrase shortcuts like "Log water": Settings › Siri & voice commands.

Siri opens the link in Safari. iPhone keeps Safari's data separate from Home Screen apps, so if you log with Siri, use Lean Daily in Safari. Settings › Copy backup / Restore backup moves your data between them.

## Updates

When a new version is published, the open app shows an **Update available** card. Tap **Update** to load it. This matters for the Home Screen app on iPhone, which has no reload button. The card never interrupts a running workout.

After the first visit the app also works offline.

## Editing

Change the `CONFIG` block at the top of the script in `index.html`: app name, WhatsApp channel and group links, daily water goal, and daily active-minutes goal. Commit to `main` and GitHub Pages publishes it in a minute or two. People using the app then see the update card.
