net = require("net");

var clients = [];

net
  .createServer(function(socket) {
    clients.push(socket);

    socket.on("myEvent", function(message) {
      socket.write(message);
    });

    socket.write("Fala Zeze bom dia cara, aperta enter ai ");

    socket.on("data", function(data) {
      broadcast(data, socket);
    });

    socket.on("end", function() {
      clients.splice(clients.indexOf(socket), 1);
      broadcast("left the chat.\n");
    });

    function broadcast(message, sender) {
      clients.forEach(function(client) {
        if (client === sender) return;
        client.emit("myEvent", message);
      });

      process.stdout.write(message);
    }
  })
  .listen(9000);

console.log("Chat server running at port 9000\n");
