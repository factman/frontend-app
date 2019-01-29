const server = {
  accountNumber: 10,
  accounts: [],
  // accountSeed: "potato soda general fun repeat fog six air bird mountain shield bread",
  setAccountNumber: (value) => {
    server.accountNumber = value;
  },
  start: () => {
    if (server.accountNumber < 1) {
      window.alert("Enter a number greater than 1");
      return false;
    }
    return fetch("http://35.201.30.99:7234/ganache/start", {
      body: JSON.stringify({
        total_accounts: server.accountNumber,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then(response => response.json())
      .then((res) => {
        if (res.success) {
          server.accounts = res.data;
          server.displayAccounts();
        }
      })
      .catch(ex => console.log(ex.message));
  },
  displayAccounts: () => {
    const accountCon = document.getElementById("accountCons");
    let contents = "<h3>Server Status: <span style=\"color: lime\">Online</span></h3>";
    server.accounts.map((account) => {
      contents += `
      <ul>
        <li>
          <strong>Public Address:</strong> ${account.publicAddress}
            <br /><br />
            <ul>
              <li>
                <strong>Public Key:</strong> ${account.publicKey}
              </li>
              <li>
                <strong>Secret Key:</strong> ${account.secretKey}
              </li>
            </ul>
        </li>
      </ul>
      <br />`;
      return account;
    });
    accountCon.innerHTML = contents;
  },
};

const acc = document.getElementsByClassName("accordion");

for (let i = 0; i < acc.length; i += 1) {
  acc[i].addEventListener("click", (event) => {
    const ele = event.srcElement;
    ele.classList.toggle("active");
    const panel = ele.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}
