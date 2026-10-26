# Quiz App: Dynamic Frontend, Built Step by Step

This page lists **the order in which the files were added** to turn `static-frontend` (UI only)
into this working, backend-connected app. After each step it says **what output you should see**,
so you can rebuild it slowly and check the result at every stage.

> Before you start: run the backend (`cd backend && npm start`). It runs on **http://localhost:8080**.

---

## Step 0: Start from the static UI

**Files:** copy everything from `static-frontend/` (public, assets, index.css, App.css,
index.js, App.js, ui/Button, ui/Card, ui/QuizLogo, the 3 screens, Main).

**Run:** `npm install` then `npm start`

**Output:** All 3 screens look correct. Every value is fake: one sample question, `1/30`, score `7`.
Clicking options does nothing.

---

## Step 1: Add the backend URL and axios

**Files added:**
- `.env`: `REACT_APP_API_URL=http://localhost:8080`
- `package.json`: add `"axios"` (`npm install axios`)

**Output:** No visible change yet. Restart `npm start` after editing `.env`. React reads it only at startup.

---

## Step 2: Common error handler

**File added:** `src/utils/handleError.js`

**Output:** No visible change. This is a helper that the API files use in the next steps.

---

## Step 3: API to fetch questions

**File added:** `src/api/fetchQuestionsApi.js` (GET `/v1/questions`)

**Quick test (optional):** in `WelcomeScreen.jsx`, temporarily call
`fetchQuestionsApi(console.log, handleError, () => {})` inside the button click.

**Output:** Click Start, open DevTools → Console. You see `{ questions: [ ...30 items ] }` from the backend.
If the backend is off, you get an alert: *unknown error occured*.

---

## Step 4: Create the Context (the empty "box")

**File added:** `src/store/QuestionContext.jsx`

**Output:** No visible change.

---

## Step 5: Provider: the quiz brain

**File added:** `src/store/QuestionProvider.jsx`

It holds `questions` and `activeQuestionId` and gives out `activeQuestion`, `activeQuestionNumber`,
`totalQuestions`, `correctAnswers`, `processQuestions`, `updateQuestionStatus`, `activateNextQuestion`.

**Output:** No visible change. It is not used yet.

---

## Step 6: Custom hook to read the context

**File added:** `src/hooks/useQuestionContext.jsx`

**Output:** No visible change.

---

## Step 7: Wrap the screens with the Provider

**File changed:** `src/components/Main.jsx`: wrap the screens in `<QuestionProvider>...</QuestionProvider>`.

**Output:** Same UI as before. Every screen can now call `useQuestionContext()`.

---

## Step 8: Welcome screen loads real questions

**File changed:** `src/components/WelcomeScreen.jsx`
- Start button → `fetchQuestionsApi` → `processQuestions(responseData.questions)` → `showQuestionScreen()`
- Button gets `loading` + `loadingText="Starting the quiz"`

**Output:** Click Start. The button briefly shows **"Starting the quiz"** (faded), then the Question screen opens.
The question screen still shows the static sample until Step 10.

---

## Step 9: Progress bar becomes real

**File changed:** `src/components/ui/ProgressBar.jsx`: read `activeQuestionNumber` and `totalQuestions` from context.

**Output:** The purple bar at the top shows the real progress (1 of 30 → a small filled part).

---

## Step 10: Question screen shows the real question

**File changed:** `src/components/QuestionScreen.jsx` (display part)
- Use `activeQuestion.question`, `activeQuestion.options`, `activeQuestionNumber/totalQuestions`

**Output:** You see a **real random question from the database** with its 4 options and `1/30` in the circle.

---

## Step 11: API to validate the answer + option click

**File added:** `src/api/validateAnswerApi.js` (POST `/v1/questions/validate-answer`)

**File changed:** `src/components/QuestionScreen.jsx` (click part)
- `handleClick(option)` → save selected option → `validateAnswerApi(...)` → `updateQuestionStatus(status === 1)`
- Add classes `correct-answer` / `incorrect-answer` / `loading`, and `disabled={hasAttempted}`

**Output:** Click an option. It fades for a moment, then turns **green with ✓** (correct) or **red with ✗** (wrong).
The other options can no longer be clicked.

---

## Step 12: Next and Submit buttons

**File changed:** `src/components/QuestionScreen.jsx` (button part)
- `disabled={!activeQuestion.hasAttempted}`
- Not the last question → **Next** → `activateNextQuestion()`
- Last question → **Submit** → `showResultScreen()`

**Output:** **Next** stays faded until you answer. Then it moves to `2/30`, `3/30`, and so on, and the progress bar grows.
On `30/30` the button says **Submit** and the bar is completely full.

---

## Step 13: Result screen shows the real score + Restart

**File changed:** `src/components/ResultScreen.jsx`
- Read `correctAnswers` and `totalQuestions` from context
- Feedback text by percentage: ≥90 *Excellent Job*, ≥70 *Good Job!*, ≥50 *You Did Okay*, else *You Could Have Done Better*
- Restart → `fetchQuestionsApi` again → `processQuestions` → Question screen

**Output:** You see your **real score** (e.g. `18` out of `30`) with the matching message.
Click **Restart**. It shows *Restarting....*, then a fresh set of random questions starts from `1/30`.

---

## Final file map

```
dynamicfrontend/
├── .env                              Step 1  backend URL
├── package.json                      Step 1  + axios
├── public/                           Step 0
└── src/
    ├── index.js, App.js, *.css       Step 0
    ├── assets/                       Step 0
    ├── utils/handleError.js          Step 2
    ├── api/fetchQuestionsApi.js      Step 3
    ├── api/validateAnswerApi.js      Step 11
    ├── store/QuestionContext.jsx     Step 4
    ├── store/QuestionProvider.jsx    Step 5
    ├── hooks/useQuestionContext.jsx  Step 6
    └── components/
        ├── Main.jsx                  Step 7
        ├── WelcomeScreen.jsx         Step 8
        ├── ui/ProgressBar.jsx        Step 9
        ├── QuestionScreen.jsx        Steps 10, 11, 12
        ├── ResultScreen.jsx          Step 13
        └── ui/Button, Card, QuizLogo Step 0 (no change)
```
