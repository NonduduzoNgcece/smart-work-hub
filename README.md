# Smart Work Hub

Absolutely — here is a complete **single-file responsive web app** you can run immediately. It includes:

* Modern SaaS dashboard
* Sidebar navigation
* Task manager with categories and completion
* Dark mode
* Smart Email Generator
* Meeting Notes Summarizer
* AI Task Planner
* Structured prompts
* Editable AI outputs
* Copy-to-clipboard
* Responsive mobile layout
* Responsible AI disclaimer
* Calming blue visual system

Save this as `index.html` and open it in a browser.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AI Workplace Productivity Assistant</title>

  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      --bg: #f5f8fc;
      --surface: #ffffff;
      --surface-2: #f8fafc;
      --text: #172033;
      --muted: #718096;
      --border: #e5eaf1;
      --primary: #2563eb;
      --primary-dark: #1d4ed8;
      --primary-light: #eff6ff;
      --success: #16a34a;
      --warning: #d97706;
      --danger: #dc2626;
      --sidebar: #ffffff;
      --shadow: 0 8px 30px rgba(15, 23, 42, 0.06);
    }

    body.dark {
      --bg: #0f172a;
      --surface: #172033;
      --surface-2: #1e293b;
      --text: #f8fafc;
      --muted: #94a3b8;
      --border: #293548;
      --primary: #60a5fa;
      --primary-dark: #3b82f6;
      --primary-light: #172554;
      --sidebar: #111827;
      --shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
    }

    body {
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      transition: background .25s, color .25s;
    }

    button,
    input,
    textarea,
    select {
      font: inherit;
    }

    button {
      cursor: pointer;
    }

    .app {
      display: flex;
      min-height: 100vh;
    }

    /* Sidebar */
    .sidebar {
      width: 260px;
      background: var(--sidebar);
      border-right: 1px solid var(--border);
      padding: 24px 16px;
      position: fixed;
      inset: 0 auto 0 0;
      z-index: 20;
      transition: transform .25s ease;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 10px 30px;
    }

    .brand-icon {
      width: 40px;
      height: 40px;
      display: grid;
      place-items: center;
      border-radius: 12px;
      background: linear-gradient(135deg, #2563eb, #60a5fa);
      color: white;
      font-size: 20px;
      box-shadow: 0 8px 20px rgba(37, 99, 235, .25);
    }

    .brand h1 {
      font-size: 15px;
      line-height: 1.2;
    }

    .brand span {
      display: block;
      color: var(--muted);
      font-size: 11px;
      margin-top: 3px;
    }

    .nav-label {
      color: var(--muted);
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: .12em;
      font-weight: 700;
      padding: 0 12px 10px;
    }

    .nav {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .nav button {
      width: 100%;
      border: 0;
      background: transparent;
      color: var(--muted);
      padding: 11px 12px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      gap: 12px;
      text-align: left;
      transition: .2s;
    }

    .nav button:hover {
      background: var(--surface-2);
      color: var(--text);
    }

    .nav button.active {
      color: var(--primary);
      background: var(--primary-light);
      font-weight: 700;
    }

    .nav-icon {
      width: 20px;
      text-align: center;
    }

    .sidebar-bottom {
      position: absolute;
      left: 16px;
      right: 16px;
      bottom: 20px;
    }

    .ai-disclaimer {
      background: var(--surface-2);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 12px;
      font-size: 11px;
      line-height: 1.5;
      color: var(--muted);
    }

    .ai-disclaimer strong {
      color: var(--text);
      display: block;
      margin-bottom: 4px;
    }

    /* Main */
    .main {
      margin-left: 260px;
      width: calc(100% - 260px);
      min-width: 0;
    }

    .topbar {
      height: 76px;
      border-bottom: 1px solid var(--border);
      background: var(--surface);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32px;
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .mobile-menu {
      display: none;
      border: 0;
      background: transparent;
      color: var(--text);
      font-size: 22px;
    }

    .topbar-title h2 {
      font-size: 19px;
    }

    .topbar-title p {
      color: var(--muted);
      font-size: 12px;
      margin-top: 3px;
    }

    .topbar-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .icon-button {
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text);
      width: 38px;
      height: 38px;
      border-radius: 10px;
      display: grid;
      place-items: center;
    }

    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #dbeafe;
      color: #1d4ed8;
      display: grid;
      place-items: center;
      font-weight: 700;
      font-size: 13px;
    }

    .content {
      padding: 30px;
      max-width: 1500px;
      margin: auto;
    }

    /* Dashboard */
    .hero {
      background: linear-gradient(135deg, #1d4ed8, #3b82f6);
      border-radius: 18px;
      padding: 28px;
      color: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      margin-bottom: 24px;
      box-shadow: 0 12px 30px rgba(37, 99, 235, .18);
    }

    .hero h3 {
      font-size: 24px;
      margin-bottom: 8px;
    }

    .hero p {
      opacity: .86;
      max-width: 650px;
      font-size: 14px;
      line-height: 1.6;
    }

    .hero-stat {
      min-width: 130px;
      padding: 16px;
      background: rgba(255,255,255,.13);
      border: 1px solid rgba(255,255,255,.2);
      border-radius: 14px;
      text-align: center;
    }

    .hero-stat strong {
      display: block;
      font-size: 26px;
    }

    .hero-stat span {
      font-size: 11px;
      opacity: .8;
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 24px;
    }

    .stat-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 18px;
      box-shadow: var(--shadow);
    }

    .stat-card small {
      color: var(--muted);
      font-size: 11px;
    }

    .stat-card strong {
      display: block;
      font-size: 26px;
      margin-top: 8px;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      gap: 20px;
    }

    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 20px;
      box-shadow: var(--shadow);
    }

    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 18px;
      gap: 12px;
    }

    .card-header h3 {
      font-size: 15px;
    }

    .card-header p {
      color: var(--muted);
      font-size: 11px;
      margin-top: 3px;
    }

    .btn {
      border: 0;
      border-radius: 9px;
      padding: 9px 13px;
      font-size: 12px;
      font-weight: 700;
      transition: .2s;
    }

    .btn-primary {
      background: var(--primary);
      color: white;
    }

    .btn-primary:hover {
      background: var(--primary-dark);
      transform: translateY(-1px);
    }

    .btn-secondary {
      background: var(--surface-2);
      color: var(--text);
      border: 1px solid var(--border);
    }

    /* Tasks */
    .task-form {
      display: grid;
      grid-template-columns: 1fr 140px auto;
      gap: 8px;
      margin-bottom: 16px;
    }

    .input,
    .textarea,
    .select {
      width: 100%;
      background: var(--surface);
      color: var(--text);
      border: 1px solid var(--border);
      border-radius: 9px;
      padding: 10px 12px;
      outline: none;
      transition: border .2s, box-shadow .2s;
    }

    .input:focus,
    .textarea:focus,
    .select:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, .1);
    }

    .task-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .task {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border: 1px solid var(--border);
      border-radius: 11px;
      transition: .2s;
    }

    .task:hover {
      border-color: #bfdbfe;
    }

    .task-check {
      width: 19px;
      height: 19px;
      accent-color: var(--primary);
      flex: 0 0 auto;
    }

    .task-info {
      flex: 1;
      min-width: 0;
    }

    .task-title {
      font-size: 13px;
      font-weight: 600;
    }

    .task.completed .task-title {
      text-decoration: line-through;
      color: var(--muted);
    }

    .task-meta {
      display: flex;
      gap: 7px;
      margin-top: 5px;
      align-items: center;
    }

    .tag {
      font-size: 10px;
      padding: 3px 7px;
      border-radius: 20px;
      background: var(--primary-light);
      color: var(--primary);
      font-weight: 700;
    }

    .delete-task {
      border: 0;
      background: transparent;
      color: var(--muted);
      font-size: 16px;
    }

    /* Quick actions */
    .quick-actions {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }

    .quick-card {
      padding: 16px;
      border: 1px solid var(--border);
      border-radius: 12px;
      background: var(--surface-2);
      cursor: pointer;
      transition: .2s;
    }

    .quick-card:hover {
      border-color: #93c5fd;
      transform: translateY(-2px);
    }

    .quick-icon {
      width: 35px;
      height: 35px;
      border-radius: 10px;
      background: var(--primary-light);
      color: var(--primary);
      display: grid;
      place-items: center;
      margin-bottom: 10px;
    }

    .quick-card strong {
      font-size: 12px;
      display: block;
    }

    .quick-card span {
      display: block;
      color: var(--muted);
      font-size: 10px;
      margin-top: 4px;
      line-height: 1.4;
    }

    /* AI tools */
    .tool-page {
      display: none;
    }

    .tool-page.active {
      display: block;
    }

    .tool-layout {
      display: grid;
      grid-template-columns: minmax(280px, .9fr) minmax(350px, 1.1fr);
      gap: 20px;
    }

    .tool-intro {
      margin-bottom: 22px;
    }

    .tool-intro h2 {
      font-size: 23px;
      margin-bottom: 7px;
    }

    .tool-intro p {
      color: var(--muted);
      font-size: 13px;
      line-height: 1.6;
    }

    .form-group {
      margin-bottom: 15px;
    }

    .form-group label {
      display: block;
      font-size: 11px;
      font-weight: 700;
      margin-bottom: 7px;
    }

    .textarea {
      resize: vertical;
      min-height: 110px;
    }

    .prompt-preview {
      padding: 12px;
      border-radius: 10px;
      background: var(--surface-2);
      border: 1px solid var(--border);
      margin-top: 15px;
    }

    .prompt-preview strong {
      display: block;
      font-size: 10px;
      text-transform: uppercase;
      color: var(--muted);
      letter-spacing: .08em;
      margin-bottom: 6px;
    }

    .prompt-preview code {
      font-size: 11px;
      color: var(--text);
      white-space: pre-wrap;
      line-height: 1.5;
    }

    .output-editor {
      min-height: 410px;
      resize: vertical;
      line-height: 1.7;
      font-size: 13px;
    }

    .output-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 10px;
    }

    .generated-label {
      display: inline-flex;
      gap: 6px;
      align-items: center;
      font-size: 10px;
      color: var(--success);
      font-weight: 700;
      margin-bottom: 8px;
    }

    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--success);
    }

    /* Empty state */
    .empty {
      text-align: center;
      color: var(--muted);
      padding: 30px 10px;
      font-size: 12px;
    }

    /* Toast */
    .toast {
      position: fixed;
      right: 25px;
      bottom: 25px;
      background: #111827;
      color: white;
      padding: 12px 16px;
      border-radius: 10px;
      font-size: 12px;
      opacity: 0;
      transform: translateY(10px);
      pointer-events: none;
      transition: .25s;
      z-index: 100;
    }

    .toast.show {
      opacity: 1;
      transform: translateY(0);
    }

    /* Responsive */
    @media (max-width: 1050px) {
      .stats {
        grid-template-columns: repeat(2, 1fr);
      }

      .dashboard-grid,
      .tool-layout {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 760px) {
      .sidebar {
        transform: translateX(-100%);
      }

      .sidebar.open {
        transform: translateX(0);
      }

      .main {
        margin-left: 0;
        width: 100%;
      }

      .mobile-menu {
        display: block;
      }

      .topbar {
        padding: 0 16px;
      }

      .content {
        padding: 18px;
      }

      .hero {
        align-items: flex-start;
        flex-direction: column;
      }

      .hero-stat {
        width: 100%;
      }

      .task-form {
        grid-template-columns: 1fr;
      }

      .stats {
        grid-template-columns: 1fr 1fr;
      }
    }

    @media (max-width: 480px) {
      .stats {
        grid-template-columns: 1fr;
      }

      .quick-actions {
        grid-template-columns: 1fr;
      }

      .topbar-title p {
        display: none;
      }

      .avatar {
        display: none;
      }
    }
  







  


    


      

✦


      


        

AI Workplace


        Productivity Assistant
      


    



    

Workspace



    
      
        ⌂
        Dashboard
      

      
        ✓
        My Tasks
      

      
        ✉
        Smart Email
      

      
        ◫
        Meeting Notes
      

      
        ✦
        AI Task Planner
      
    

    


      


        Responsible AI
        AI-generated content may contain errors. Review outputs carefully before using them for workplace decisions or communications.
      


    



  

    


      


        ☰
        


          

Good morning 👋


          

Here's what's happening with your work today.


        


      



      


        ☾
        

NN


      


    



    



      
      



        


          


            

Work smarter with AI.


            


              Plan tasks, create professional emails, summarize meetings,
              and turn ideas into actionable workflows from one intelligent workspace.
            


          



          


            0
            Tasks completed
          


        



        


          


            Total Tasks
            0
          



          


            Completed
            0
          



          


            In Progress
            0
          



          


            AI Tools
            3
          


        



        



          


            


              


                

Today's Tasks


                

Your most important work


              



              
                + Add Task
              
            



            


          



          


            


              


                

AI Productivity Tools


                

Automate repetitive work


              


            



            



              


                

✉


                Smart Email
                Draft clear professional emails.
              



              


                

◫


                Meeting Notes
                Turn notes into concise summaries.
              



              


                

✦


                Task Planner
                Break large goals into tasks.
              



              


                

✓


                Task Manager
                Organize your daily workload.
              



            


          



        


      



      
      



        


          

My Tasks


          

Capture, organize and complete your work from one focused workspace.


        



        



          


            

            
              Work
              Personal
              Priority
              Meeting
              Research
            

            
              Add Task
            
          



          



        


      



      
      



        


          

Smart Email Generator


          


            Generate polished workplace emails using structured AI prompts.
            Edit the generated result before sending.
          


        



        



          



            


              EMAIL PURPOSE
              
            



            


              RECIPIENT / AUDIENCE
              
            



            


              TONE
              
                Professional
                Friendly
                Concise
                Persuasive
                Formal
              
            



            


              KEY POINTS
              
            



            


              Structured AI Prompt
              
Role: Professional workplace email assistant
Goal: Generate a clear and concise email
Tone: Professional
Output: Subject + email body
              
            



            
              ✦ Generate Email
            

          



          



            


              


                

Generated Email


                

Fully editable before use


              


            



            


              
              AI generated draft
            



            Your generated email will appear here.

You can edit this content before copying it into your email client.
            

            


              
                Copy
              
              
                Regenerate
              
            



          



        


      



      
      



        


          

Meeting Notes Summarizer


          


            Convert raw meeting notes into structured summaries, decisions,
            action items and follow-ups.
          


        



        



          



            


              MEETING TITLE
              
            



            


              RAW NOTES
              
            



            


              Structured AI Prompt
              
Role: Meeting intelligence assistant
Task: Analyze raw notes
Return:
1. Executive summary
2. Key decisions
3. Action items
4. Owners
5. Follow-up questions
              
            



            
              ✦ Summarize Meeting
            

          



          



            


              


                

Meeting Summary


                

Edit the result as needed


              


            



            


              
              AI generated summary
            



            

            


              
                Copy
              

              
                Regenerate
              
            



          



        


      



      
      



        


          

AI Task Planner


          


            Transform a high-level goal into a practical sequence of
            actionable workplace tasks.
          


        



        



          



            


              GOAL
              
            



            


              DEADLINE
              
            



            


              PRIORITY
              
                High
                Medium
                Low
              
            



            


              ADDITIONAL CONTEXT
              
            



            


              Structured AI Prompt
              
Role: Workplace project planning assistant
Goal: Break objective into actionable tasks
Prioritize by urgency and dependency
Output: Ordered task plan with milestones
              
            



            
              ✦ Create Task Plan
            

          



          



            


              


                

AI Task Plan


                

Edit, refine or add the tasks to your workspace


              


            



            


              
              AI generated plan
            



            

            


              
                Copy
              

              
                Regenerate
              
            



          



        


      



    





Copied to clipboard







```

### Recommended next step

This version is a **fully functional frontend prototype**. The AI buttons currently use local demo generation so the interface works without an API.

For a production version, the architecture should be:

```text
React / Next.js
       │
       ├── Dashboard
       ├── Task Manager
       ├── Smart Email
       ├── Meeting Summarizer
       └── AI Task Planner
              │
              ▼
        Backend API
              │
       ┌──────┴──────┐
       ▼             ▼
   AI Provider    Database
                   │
             Tasks / Users /
             Preferences
```

The AI layer can then replace the demo functions with real structured prompts and return JSON such as:

```json
{
  "summary": "...",
  "action_items": [
    {
      "task": "Prepare project proposal",
      "owner": "Project Manager",
      "priority": "high",
      "deadline": "Friday"
    }
  ]
}
```

That would make the **AI Workplace Productivity Assistant** a genuine SaaS application rather than just a static dashboard.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/917e1f9a-8dd3-470f-af5f-63f1ed60c0d1).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
