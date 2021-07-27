import React from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';

import { CityWeatherDataResponse } from '../../scripts/types';
import { getFullCityName } from '../../scripts/utils';

import { removeCity } from "../../store/citiesSlice";
import { useAppDispatch } from "../../store/hooks";

import { ReactComponent as IconTrash } from "../../assets/icons/trash.svg";
import { ReactComponent as IconReorder } from "../../assets/icons/menu.svg";

import './SettingsCityItem.scss';

type SettingsCityItemProps = {
    provided: DraggableProvided;
    city: CityWeatherDataResponse;
}

export const SettingsCityItem: React.FC<SettingsCityItemProps> = (props) => {
    const { provided, city } = props;

    const dispatch = useAppDispatch();

    return (
        <div
            className="SettingsCityItem"
            {...provided.draggableProps}
            ref={provided.innerRef}
        >
            <div className="SettingsCityItem__left">
                <button
                    className="SettingsCityItem__reorderButton"
                    {...provided.dragHandleProps}
                >
                    <IconReorder className="SettingsCityItem__reorderButtonIcon"/>
                </button>

                <span className="SettingsCityItem__cityName">
                    {getFullCityName(city)}
                </span>
            </div>

            <button
                className="SettingsCityItem__removeButton"
                type="button"
                onClick={() => dispatch(removeCity(city.id))}
            >
                <IconTrash className="SettingsCityItem__removeButtonIcon" />
            </button>
        </div>
    );
}
