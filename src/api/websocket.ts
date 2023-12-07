import { useEffect, useState } from "react";

export default function Websocket() {

    const [websock, setWebsocket] = useState<WebSocket | undefined>();

    useEffect(() => {
        const ws = new WebSocket('wss://lobster-app-osqfh.onndigitalocean.app/');

        ws.onopen = () => {
            console.log('WebSocket opened');
        }

        ws.onmessage = (event) => {
            console.log('socket:' +event.data);
            const received = JSON.parse(event.data);
            console.log(received);
            
        }

        ws.onclose = () => {
            console.log('WebSocket closed');
        }

        setWebsocket(ws);

        return () => {
            if (ws) {
                ws.close();
            }
        }
    }, [])
}