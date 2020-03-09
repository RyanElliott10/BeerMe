import * as Constants from "../Utils/Constants";
import NetClient from "../Utils/NetClient";

class UserController {
  static firstName = "";
  static lastName = "";
  static email = "";
  static password = "";
  static isBusiness = true; // change to default of false once live
  static businessName = "";
  static currBeer = "";
  static currABV = "";
  static currIBU = "";
  static currStyle = "";
  static currBeerId = 0;
  static userId = 0;


  static isLoggedIn = false;
  static cachedBeers = [];

  static async login(email, password) {
    console.log(`UserController: login ${email} ${password}`);
    this.email = email;
    this.password = password;

    const data = {
      email: email,
      password: password
    };

    NetClient.post("https://localhost:44300/api/login", data).then(data => {
      if (data) {
        this.userId = data.Id
        this.firstName = data.Name.split(" ")[0];
        this.lastName = data.Name.split(" ")[1];
        this.email = data.Email;
        this.isBusiness = data.IsBusiness;
        this.businessName = data.BusinessName;
        this.isLoggedIn = true;
      }
      this.isLoggedIn = false;
    });

    return this.isLoggedIn;
  }

  static async createAccount(
    firstName,
    lastName,
    email,
    password,
    isBusiness = false,
    businessName = ""
  ) {
    this.email = email;
    this.password = password;

    const data = {
      name: `${firstName} ${lastName}`,
      email: email,
      password: password,
      isBusiness: isBusiness,
      businessName: businessName
    };

    NetClient.post("https://localhost:44300/api/users", data).then(data => {
      if (data) {
        this.userId = data.Id
        this.firstName = data.Name.split(" ")[0];
        this.lastName = data.Name.split(" ")[1];
        this.email = data.Email;
        this.isBusiness = data.IsBusiness;
        this.businessName = data.BusinessName;
        this.isLoggedIn = true;
      }
      this.isLoggedIn = false;
    });

    return this.isLoggedIn;
  }

  static getCurrentUser() {
    return this.isLoggedIn;
  }
}

export default UserController;
