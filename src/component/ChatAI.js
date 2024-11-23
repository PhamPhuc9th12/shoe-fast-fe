import React, { useEffect } from "react";

const ChatAI = () => {
    useEffect(() => {
        const scriptId = "df-messenger-script";
        const existingScript = document.getElementById(scriptId);

        // Kiểm tra xem component 'df-messenger' đã được đăng ký chưa
        if (!window.customElements.get('df-messenger')) {
            if (!existingScript) {
                const script = document.createElement("script");
                script.id = scriptId;
                script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
                script.async = true;
                script.onload = () => {
                    console.log("Dialogflow script loaded");
                };
                document.body.appendChild(script);
            }
        }

        // Clean up script khi component unmount
        return () => {
            const script = document.getElementById(scriptId);
            if (script) {
                document.body.removeChild(script);
            }
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
