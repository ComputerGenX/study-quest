# Classroom games

Games for live classes. Each one is a single HTML file that runs in the browser.

- `case8/`: Case 8 "Local and International?" vote game. The host opens `index.html` on the projector and creates a room. Students open the same page on a phone, choose Join, and enter the room code. The class votes on five decisions. The most popular choice moves the story. At the end, students send one word for what went right and one for what went wrong. The word bubbles grow with each repeat.

- `case8-columns/`: Case 8 word bubbles. Students scan a QR code and send short phrases into three columns: Employers' needs, Employees' needs, and Elements to add. The host page shows each phrase as a bubble. It uses HTTPS only (ntfy.sh relay), so it does not need WebRTC.

- `case8-swot/`: Case 8 SWOT bubbles. It works like `case8-columns/`, with its own link, QR code, and rooms. Students send short phrases into four boxes: Strengths, Weaknesses, Opportunities, and Threats.

- `case8-fair/`: Case 8 "Is the policy fair?" poll. Each phone chooses Yes or No and can send one answer. The host page shows the votes and percentages, and the word bubbles grow with each answer's share.

PeerJS connects the host and phones. The host page must stay open for the whole game.
