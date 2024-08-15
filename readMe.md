## API Cypress tests for Lixxy app

API and UI automation test for Lixxy web application.

Test are written using Cypress as a main automation tool.

Tests are written based on test cases : [Test cases]https://docs.google.com/spreadsheets/d/1WKFsEAVd27HHdVdp_PXDztg1R68J_O3q/edit?usp=sharing&ouid=112772196783359617351&rtpof=true&sd=true

## Running Cypress Tests Locally
### Prerequisites
Ensure you have the following installed on your system:
- **Node.js** and **npm** (Node Package Manager)
- **Git**

### Steps to Clone and Run Tests

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/Lubka93/API_Lixxy.git
    ```

2. **Navigate to the Project Directory:**
    ```bash
    cd cypressE2E_TrackMyCals
    ```

3. **Install Dependencies:**
    ```bash
    npm install
    ```

4. **Run Cypress Tests:**
    - To open the Cypress Test Runner:
        ```bash
        npm run runner
        ```
    - To run all tests in headless mode:
        ```bash
        npm run runnerNotH
        ```

