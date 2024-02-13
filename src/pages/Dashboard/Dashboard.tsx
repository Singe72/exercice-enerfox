import styles from "./Dashboard.module.css";
import { useEffect, useState } from "react";
import { DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/fr_FR";
import "dayjs/locale/fr";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { IGetDeviceData, TIME_FRAME, getDeviceData } from "../../services/api";

type TransformedDeviceData = {
    name: string;
    puissance: number;
}

export default function Dashboard() {
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());
    const [deviceData, setDeviceData] = useState<TransformedDeviceData[]>();

    useEffect(() => {
        async function fetchData() {
            const params: IGetDeviceData = {
                fields: ["p"],
                start: selectedDate.startOf("day").valueOf(),
                end: selectedDate.endOf("day").valueOf(),
                timeframe: TIME_FRAME.MINUTE,
            };
            const data = await getDeviceData(params);
            const transformedData = data.map(d => {
                const { timestamp, values: { p } } = d;
                return {
                    name: new Date(timestamp).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
                    puissance: p,
                };
            });
            setDeviceData(transformedData);
        }
        fetchData();
    }, [selectedDate]);

    const handleDateChange: DatePickerProps["onChange"] = (date, _) => {
        if (!date) {
            return setSelectedDate(dayjs());
        }
        setSelectedDate(date);
    };

    return (
        <div className={styles.DashboardContainer}>
            <div className={styles.Chart}>
                <DatePicker
                    picker="date"
                    locale={locale}
                    format={"DD/MM/YYYY"}
                    size="large"
                    placeholder="Sélectionnez une date"
                    defaultValue={selectedDate}
                    onChange={handleDateChange}
                />
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={100}
                        data={deviceData}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" interval={119} />
                        <YAxis unit=" W" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="puissance" stroke="#82ca9d" dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className={styles.ChartLegendContainer}>
                <div className={styles.ChartLegend}>
                    <h2>Puissance consommée par votre appareil</h2>
                    <p>Données du <span>{selectedDate.locale("fr").format("dddd D MMMM YYYY")}</span></p>
                </div>
            </div>
        </div>
    );
}