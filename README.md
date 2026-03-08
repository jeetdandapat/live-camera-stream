# 📷 Live Camera Streaming – Setup Guide

This project allows a **mobile phone camera to stream live video to a laptop dashboard** using **WebRTC and Socket.IO**.

The phone acts as the **camera device**, while the laptop browser displays the **live video stream**.

---

# 1️⃣ Install Dependencies

Install dependencies for both backend and frontend.

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd camera-stream-frontend
npm install
```

---

# 2️⃣ Run Backend Server

Start the backend server.

```bash
cd backend
npm start
```

You should see:

```
Server running on port 5000
```

The backend runs on:

```
http://localhost:5000
```

---

# 3️⃣ Run Frontend + ngrok

The frontend project already includes **ngrok configuration**.

So you only need to run one command:

```bash
cd camera-stream-frontend
npm run start
```

This command starts:

• React frontend server
• ngrok secure tunnel

Example terminal output:

```
Local:   http://localhost:5173
Network: http://10.216.41.151:5173
https://xxxxx.ngrok-free.dev
```

The **ngrok HTTPS link** is important because mobile browsers require **secure HTTPS to access the camera**.

Example:

```
https://abcd1234.ngrok-free.dev
```

---

# 4️⃣ Open Dashboard First

Open the dashboard in your laptop browser:

```
https://abcd1234.ngrok-free.dev
```

This page shows the **live video feed**.

On the dashboard you will also see:

• Camera link
• QR code

---

# 5️⃣ Open Camera on Mobile

There are two ways to open the camera page.

### Option 1 — Scan QR Code

Use your phone to scan the QR code displayed on the dashboard.

This will open the camera page automatically.

---

### Option 2 — Open Camera Link

Open the camera link in your phone browser.

```
https://abcd1234.ngrok-free.dev/camera
```

Then:

1. Allow camera permission
2. Click **Start Camera**

Your phone camera will start streaming to the dashboard.

---

# 6️⃣ Important — Update IP Address

Inside the frontend project open this file:

```
src/services/socketService.js
```

Example code:

```javascript
import { io } from "socket.io-client"

const socket = io("http://10.216.41.151:5000")

export default socket
```

The IP address (`10.216.41.151`) is the **local IP address of your laptop**.

This IP may change depending on your network.

You can find your correct IP in the frontend terminal output.

Example:

```
Network: http://10.216.41.120:5173
```

If the IP changes, update it in `socketService.js`.

Example:

```javascript
const socket = io("http://10.216.41.120:5000")
```

This step ensures the **frontend connects correctly to the backend server**.

---

# 7️⃣ Why ngrok is Used

Mobile browsers do **not allow camera access on insecure HTTP connections**.

Example (this will fail):

```
http://localhost:5173
```

Because of this restriction, the browser may show errors such as:

```
Camera not supported
Camera permission blocked
```

To solve this issue, the project uses **ngrok**.

ngrok provides a **secure HTTPS tunnel**, allowing mobile browsers to access the camera.

Example:

```
https://abcd1234.ngrok-free.dev
```

This secure link allows the camera to work correctly.

---

# 8️⃣ Important Note

If you open this link on your phone:

```
https://abcd1234.ngrok-free.dev
```

You will only see the **dashboard**.

The camera will **not start from this page**.

To start the camera you must open:

```
https://abcd1234.ngrok-free.dev/camera
```

This page requests **camera permission** and starts the video stream.

---

# 🎯 Final Workflow

Mobile Phone
↓
Open `/camera` page
↓
Allow camera access
↓
WebRTC sends video stream
↓
Dashboard receives video
↓
Live stream appears on laptop


# 🎥 Project Demo Video

You can watch the full working demo of the **Live Camera Streaming Project** here:

👉 https://drive.google.com/file/d/1oY1uoEhyLwaXDTAJKpdNIBrrz0h9KSOX/view?usp=drive_link




![alt text](<Screenshot 2026-03-08 141815.png>)

![alt text](<WhatsApp Image 2026-03-08 at 2.19.28 PM.jpeg>)

![alt text](<WhatsApp Image 2026-03-08 at 2.19.28 PM (1).jpeg>)

![alt text](<Screenshot 2026-03-08 141900.png>)



