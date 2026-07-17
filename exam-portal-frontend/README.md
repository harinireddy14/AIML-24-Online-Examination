# ExamPortal — Frontend

A complete frontend for the `exam-portal-backend` Spring Boot API: login/register,
a test-taker flow (browse categories → pick a quiz → answer with a countdown
timer → see your score), and an admin panel (manage categories, quizzes,
questions, and view all submitted results).

Plain HTML/CSS/JavaScript — no build step, no npm install required.

## 1. Start the backend first

From the `exam-portal-backend` project:

1. Make sure MySQL is running and the `online_examination` database exists.
2. Check `src/main/resources/application.properties` matches your MySQL
   username/password.
3. **Important:** the backend has `spring.jpa.hibernate.ddl-auto=create`,
   which **drops and recreates every table each time you start it** — so
   `roles`, `users`, etc. are wiped on every restart. After each backend
   restart you need to re-seed the `roles` table before anyone can
   register or log in:

   ```sql
   INSERT INTO roles (role_name, role_description) VALUES
     ('USER', 'Standard test-taker'),
     ('ADMIN', 'Manages categories, quizzes and questions');
   ```

4. Run the backend (`mvn spring-boot:run` or run the main class from your
   IDE). It listens on **http://localhost:8081**.

### Getting an admin account

The `/api/register` endpoint always assigns the new user the `USER` role —
there's no signup flow for admins. To create one:

1. Register a normal account from this frontend (or via `/api/register`).
2. In MySQL, find that user's `user_id` in the `users` table, and the
   `ADMIN` row's id in `roles`, then link them:

   ```sql
   INSERT INTO user_role (user_id, role_id) VALUES (<user_id>, 'ADMIN');
   ```
   (Check your `user_role` table's actual column names with `desc user_role;`
   — they may be `user_id`/`role_id` or reference `role_name` directly.)
3. Log out and back in on the frontend — you'll land in the admin panel.

## 2. Run this frontend

No dependencies to install. From this folder:

```bash
node server.js
```

Then open **http://localhost:5500** in your browser.

(Any other static server works too — e.g. `python3 -m http.server 5500`,
or the VS Code "Live Server" extension. Just don't open `index.html`
directly via `file://`, since the browser will block API calls from
the fetch requests.)

If your backend runs on a different host or port, edit `js/config.js`:

```js
const API_BASE = "http://localhost:8081/api";
```

## What's included

- `login.html` / `register.html` — auth screens, JWT stored in `localStorage`
- `user/dashboard.html` — browse categories → active quizzes
- `user/quiz.html` — take a quiz: one question at a time, jump between
  questions, a countdown timer (1 minute per question) that auto-submits
  when it runs out, then a score screen
- `user/results.html` — your own past attempts
- `admin/dashboard.html` — counts + quick links
- `admin/categories.html`, `admin/quizzes.html`, `admin/questions.html` —
  full create/edit/delete for each
- `admin/results.html` — every attempt from every user

## Known limitations (backend-side)

- There's no endpoint to list users, so the admin results table shows
  each attempt's **user ID** rather than a username.
- Error messages from the backend are sometimes generic (Spring Boot
  hides exception details by default). If you want clearer error text
  during development, add this to `application.properties`:
  ```
  server.error.include-message=always
  ```
