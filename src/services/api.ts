export enum TIME_FRAME {
	MINUTE = "minute",
	TEN_MINUTES = "ten_minutes",
	HOUR = "hour",
	DAY = "day",
	WEEK = "week",
	MONTH = "month",
	YEAR = "year",
}

export interface IGetDeviceData {
	fields: string[];
	start: number; //timestamp en ms (1636156800000)
	end: number; //timestamp en ms (1636156800000)
	timeframe: TIME_FRAME;
}

/**
 * Example: 
 * {
 *   "timestamp": "2023-11-09T09:20:00.000Z",
 *   "values": {
 *     "p": 638.608
 *   }
 * }
 */
export interface IBodyDeviceData {
	timestamp: string;
	values: {
		[key: string]: number;
	};
}

export async function get<T>(url: string, header = {}): Promise<T> {
	return fetch(url, {
		method: "GET",
		headers: new Headers({ ...header }),
	}).then(async response => {
		const data = response.headers.get("content-length") === "0" ? undefined : await response.json();
		if (response.ok)
			return Promise.resolve(data);
		else
			return Promise.reject(data?.message);
	});
}

export function getDeviceData(params: IGetDeviceData): Promise<IBodyDeviceData[]> {
	const baseUrl = "https://api.enerfox.fr/v1/sites/6442cfb53f02c2fe2494d6c9/devices/6442d10d3131bbdf7f2c82a3/data";
	const bearer = import.meta.env.VITE_ENERFOX_BEARER_TOKEN;

	const headers = {
		Authorization: `Bearer ${bearer}`
	}

	const paramsString = new URLSearchParams({
		fields: JSON.stringify(params.fields),
		start: params.start.toString(),
		end: params.end.toString(),
		timeframe: params.timeframe
	}).toString();

	return get<IBodyDeviceData[]>(`${baseUrl}?${paramsString}`, headers);
}