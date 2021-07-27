import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { changeCitiesOrder } from '../../store/citiesSlice';

import { SettingsCityItem } from '../SettingsCityItem/SettingsCityItem';

import './SettingsCitiesList.scss';

export const SettingsCitiesList: React.FC = () => {
    const cities = useAppSelector(state => state.cities.items);
    const dispatch = useAppDispatch();

    const onDragEnd = (result: DropResult): void => {
        const { destination, source } = result;

        if (!destination) return;

        const from = source.index;
        const to = destination.index;

        if (from === to) return;

        dispatch(changeCitiesOrder({ from, to }));
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="cities-list">
                {provided => (
                    <ul
                        className="SettingsCitiesList"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {cities.map((city, index) => (
                            <Draggable draggableId={`${city.id}`} index={index} key={city.id}>
                                {(provided) => (
                                    <li className="SettingsCitiesList__item">
                                        <SettingsCityItem provided={provided} city={city} />
                                    </li>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    );
}
