import { ChatBox } from "../components/chat-box";

function Home() {
  return (
    <div className="wrapper">
      <section>
        <div style={{textAlign: "center"}}>
          <h1>
            <a href="https://github.com/Turbo1337GS">Turbo1337GS Github</a>
          </h1>
        </div>
      </section>
      <section>
        <ChatBox />
      </section>
    </div>
  );
}

export default Home;
