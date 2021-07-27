type MainInfo = {
    feels_like: number;
    temp: number;
    humidity: number;
    pressure: number;
};

type SystemInfo = {
    country: string;
};

type WeatherInfo = {
    icon: string;
    description: string;
};

type WindInfo = {
    speed: number;
    deg: number;
};

export type CityWeatherDataResponse = {
    id: number;
    main: MainInfo;
    name: string;
    sys: SystemInfo;
    visibility: number;
    weather: Array<WeatherInfo>;
    wind: WindInfo;
};

export type CitiesListType = Array<CityWeatherDataResponse>;

export type ChangeCitiesOrderActionPayload = {
    from: number;
    to: number;
};
