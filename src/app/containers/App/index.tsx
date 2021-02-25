import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const dropTableData = [
    {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
        }
    },
    {
        "id": 2,
        "name": "Ervin Howell",
        "username": "Antonette",
        "email": "Shanna@melissa.tv",
        "address": {
            "street": "Victor Plains",
            "suite": "Suite 879",
            "city": "Wisokyburgh",
            "zipcode": "90566-7771",
        }

    },
    {
        "id": 3,
        "name": "Clementine Bauch",
        "username": "Samantha",
        "email": "Nathan@yesenia.net",
        "address": {
            "street": "Douglas Extension",
            "suite": "Suite 847",
            "city": "McKenziehaven",
            "zipcode": "59590-4157",
        }
    }];

const commonDragTableData = [{
    "id": 4,
    "name": "Patricia Lebsack",
    "username": "Karianne",
    "email": "Julianne.OConner@kory.org",
    "address": {
        "street": "Hoeger Mall",
        "suite": "Apt. 692",
        "city": "South Elvis",
        "zipcode": "53919-4257"
    }
},
{
    "id": 5,
    "name": "Chelsey Dietrich",
    "username": "Kamren",
    "email": "Lucio_Hettinger@annie.ca",
    "address": {
        "street": "Skiles Walks",
        "suite": "Suite 351",
        "city": "Roscoeview",
        "zipcode": "33263"
    }
},
{
    "id": 6,
    "name": "Mrs. Dennis Schulist",
    "username": "Leopoldo_Corkery",
    "email": "Karley_Dach@jasper.info",
    "address": {
        "street": "Norberto Crossing",
        "suite": "Apt. 950",
        "city": "South Christy",
        "zipcode": "23505-1337"
    }
},
{
    "id": 7,
    "name": "Kurtis Weissnat",
    "username": "Elwyn.Skiles",
    "email": "Telly.Hoeger@billy.biz",
    "address": {
        "street": "Rex Trail",
        "suite": "Suite 280",
        "city": "Howemouth",
        "zipcode": "58804-1099"
    }
}];

const masterDropTableData = [{
    "id": 8,
    "name": "Nicholas Runolfsdottir V",
    "username": "Maxime_Nienow",
    "email": "Sherwood@rosamond.me",
    "address": {
        "street": "Ellsworth Summit",
        "suite": "Suite 729",
        "city": "Aliyaview",
        "zipcode": "45169"
    }
},
{
    "id": 9,
    "name": "Glenna Reichert",
    "username": "Delphine",
    "email": "Chaim_McDermott@dana.io",
    "address": {
        "street": "Dayna Park",
        "suite": "Suite 449",
        "city": "Bartholomebury",
        "zipcode": "76495-3109"
    }
},
{
    "id": 10,
    "name": "Clementina DuBuque",
    "username": "Moriah.Stanton",
    "email": "Rey.Padberg@karina.biz",
    "address": {
        "street": "Kattie Turnpike",
        "suite": "",
        "city": "Lebsackbury",
        "zipcode": "31428-2261"
    }
}
];
// @ts-ignore
const getItems = (tableData) =>
    tableData.map((item: any) => ({
        id: `item-${item.id}`,
        content: item.name,
        email: item.email
    }));

// a little function to help us with reordering the result
// @ts-ignore
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
// @ts-ignore
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    // @ts-ignore
    result[droppableSource.droppableId] = sourceClone;
    // @ts-ignore
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;
// @ts-ignore
const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
});
// @ts-ignore
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: '95%'
});

export class App extends Component {
    state = {
        items: getItems(dropTableData),
        selected: getItems(commonDragTableData),
        masterTable: getItems(masterDropTableData)
    };

    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        droppable: 'items',
        droppable2: 'selected',
        droppable3: 'masterTable'

    };
    // @ts-ignore
    getList = id => this.state[this.id2List[id]];
    // @ts-ignore
    onDragEnd = result => {
        const { source, destination } = result;
        console.log({ source, destination });

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { items };

            if (source.droppableId === 'droppable2') {
                // @ts-ignore
                state = { selected: items };
            }

            if (source.droppableId === 'droppable3') {
                // @ts-ignore
                state = { masterTable: items };
            }

            this.setState(state);
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );
            console.log({ result });

            this.setState({
                // @ts-ignore
                items: result.droppable ? result.droppable : this.state.items,
                // @ts-ignore
                selected: result.droppable2 ? result.droppable2 : this.state.selected,
                // @ts-ignore
                masterTable: result.droppable3 ? result.droppable3 : this.state.masterTable
            });
        }
    };

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ width: '33.33%' }}>
                        <h2>Drop Table</h2>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}>
                                    <table style={{ width: "100%" }}>
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                        </tr>
                                        {this.state.items.map((item: any, index: number) => (
                                            <Draggable
                                                key={item.id}
                                                draggableId={item.id}
                                                index={index}>
                                                {(provided, snapshot) => (
                                                    <tr
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}>
                                                        <td>{item.id}</td>
                                                        <td>{item.content}</td>
                                                        <td>{item.email}</td>
                                                    </tr>
                                                )}
                                            </Draggable>
                                        ))}
                                    </table>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                    <div style={{ width: '33.33%' }}>
                        <h2>Drop Table</h2>
                        <Droppable droppableId="droppable2">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}>
                                    <table style={{ width: "100%" }}>
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                        </tr>
                                        {this.state.selected.map((item: any, index: number) => (
                                            <Draggable
                                                key={item.id}
                                                draggableId={item.id}
                                                index={index}>
                                                {(provided, snapshot) => (
                                                    <tr
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}>
                                                        <td>{item.id}</td>
                                                        <td>{item.content}</td>
                                                        <td>{item.email}</td>
                                                    </tr>
                                                )}
                                            </Draggable>
                                        ))}
                                    </table>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                    <div style={{ width: '33.33%' }}>
                        <h2>Drop Table</h2>
                        <Droppable droppableId="droppable3">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}>
                                    <table style={{ width: "100%" }}>
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                        </tr>
                                        {this.state.masterTable.map((item: any, index: number) => (
                                            <Draggable
                                                key={item.id}
                                                draggableId={item.id}
                                                index={index}>
                                                {(provided, snapshot) => (
                                                    <tr
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}>
                                                        <td>{item.id}</td>
                                                        <td>{item.content}</td>
                                                        <td>{item.email}</td>
                                                    </tr>
                                                )}
                                            </Draggable>
                                        ))}
                                    </table>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                </div>
            </DragDropContext>
        );
    }
}
