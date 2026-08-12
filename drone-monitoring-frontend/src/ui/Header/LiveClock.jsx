import { useEffect, useState } from "react";
import { Clock3 } from "lucide-react";
import StatusChip from "../Badge/StatusChip";

function LiveClock() {

    const [time, setTime] = useState("");

    useEffect(() => {

        const update = () => {

            setTime(

                new Date().toLocaleTimeString()

            );

        };

        update();

        const timer = setInterval(update, 1000);

        return () => clearInterval(timer);

    }, []);

    return (

        <StatusChip

            variant="live"

            text={time}

            icon={<Clock3 size={14} />}

        />

    );

}

export default LiveClock;