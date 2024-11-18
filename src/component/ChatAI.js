import React, { useEffect } from "react";

const ChatAI = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <df-messenger
            intent="WELCOME"
            chat-title="Shoe-Chat-AI-1"
            agent-id="5adfb73c-7a5f-4395-b452-a1bdcea946a5"
            language-code="en"
        ></df-messenger>
    );
};

export default ChatAI;