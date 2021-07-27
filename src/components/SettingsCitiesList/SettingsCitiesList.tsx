import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { removeCity, changeCitiesOrder } from '../../store/citiesSlice';
import { ReactComponent as IconTrash } from '../../assets/icons/trash.svg';
import { ReactComponent as IconReorder } from '../../assets/icons/menu.svg';

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
                                    <li
                                        {...provided.draggableProps}
                                        ref={provided.innerRef}
                                    >
                                        <button
                                            className="SettingsCitiesList__reorderButton"
                                            {...provided.dragHandleProps}
                                        >
                                            <IconReorder className="SettingsCitiesList__reorderButtonIcon"/>
                                        </button>

                                        <span>{city.name}</span>

                                        <button
                                            className="SettingsCitiesList__removeButton"
                                            type="button"
                                            onClick={() => dispatch(removeCity(city.id))}
                                        >
                                            <IconTrash className="SettingsCitiesList__removeButtonIcon" />
                                        </button>
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
