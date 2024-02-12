import styles from "./Dashboard.module.css";
import { useEffect, useState } from "react";
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import { IGetDeviceData, TIME_FRAME, getDeviceData } from "../../services/api";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/fr_FR";
import "dayjs/locale/fr";

export default function Dashboard() {

    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());

    useEffect(() => {
        async function fetchData() {
            const params: IGetDeviceData = {
                fields: ["p"],
                start: selectedDate.startOf("day").valueOf(),
                end: selectedDate.endOf("day").valueOf(),
                timeframe: TIME_FRAME.MINUTE,
            };
            const data = await getDeviceData(params);
            console.log(data);
        }
        fetchData();
    }, [selectedDate]);

    const handleDateChange: DatePickerProps["onChange"] = (date, dateString) => {
        if (!date) {
            return setSelectedDate(dayjs());
        }
        setSelectedDate(date);
    };


    return (
        <div className={styles.DashboardContainer}>
            <div className={styles.Chart}>
                Graphique
                <DatePicker
                    picker="date"
                    locale={locale}
                    format={"DD/MM/YYYY"}
                    size="large"
                    placeholder="Sélectionnez une date"
                    defaultValue={selectedDate}
                    onChange={handleDateChange}     
                />
            </div>
            <div className={styles.ChartLegend}>
                <h2>Puissance consommée par votre appareil</h2>
                <p>Données du <span>{selectedDate.locale("fr").format("dddd D MMMM YYYY")}</span></p>
            </div>
        </div>
    );
}