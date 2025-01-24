export class User {
    constructor(user_name, password, email, idClient, tipo_usuario) {
      this.user_name = user_name;
      this.password = password;
      this.email = email;
      this.idClient = idClient;
      this.tipo_usuario = tipo_usuario;
    }
  
    // Método para mostrar la información del usuario
    mostrarInfo() {
      console.log(`Usuario: ${this.user_name}, Email: ${this.email}, ID: ${this.idClient} `);
    }

     // Método para convertir la instancia en un objeto plano
    toJSON() {
    return {
      user_name: this.user_name,
      password: this.password,
      email: this.email,
      ci: this.idClient,
    };
  }
  }

