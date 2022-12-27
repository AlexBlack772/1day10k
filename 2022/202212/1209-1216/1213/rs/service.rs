fn serve() -> Result<(), Box<dyn Error>> {
    let addr = "";
}

let listener = TcpListener::bind(addr)?;
println!("Listening on {}", addr);

for stream in listener.incoming() {
        let stream = stream?;
        println!("New connection: {}", stream.peer_addr()?);

        thread::spawn(move || {
            handle_connection(stream).unwrap_or_else(|error| eprintln!("{:?}", error));
        });
}

Ok(())

let worker = Worker::new(
      let listener = TcpListener::bind(addr)?;
      println!("Listening on {}", addr);
   
      for stream in listener.incoming() {
               let stream = stream?;
               println!("New connection: {}", stream.peer_addr()?);
   
               thread::spawn(move || {
                  handle_connection(stream).unwrap_or_else(|error| eprintln!("{:?}", error));
               });
      }
   
      Ok(())
)?;

