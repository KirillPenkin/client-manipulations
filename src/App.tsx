import { ChangeEvent, useState } from 'react';
import './App.css';
import { resources } from './entities/const';
import { entities } from './entities/createEntities';
import { filterProp, includesAnyPermissions, sortProp } from './entities/filterEntities';

function App() {
    
    const [firstNameFilter, setFirstNameFilter] = useState('');
    const [lastNameFilter, setLastNameFilter] = useState('');
    const [permission, setPpermissionsFilter] = useState(([] as string[]));

    const changeFirstName = (e: ChangeEvent<HTMLInputElement>) => {
        setFirstNameFilter(e.target.value);
    }

    const changeLastName = (e: ChangeEvent<HTMLInputElement>) => {
        setLastNameFilter(e.target.value);
    }

    const changePermissions = (item: string, checked: boolean) => {
        if (!checked) {
            const newPermission = [...permission, item];
            setPpermissionsFilter(newPermission);
        } else {
            const newPermission = permission.filter((permission) => permission !== item);
            setPpermissionsFilter(newPermission);
        }
        console.log(item);
    }

    console.time('firstName');
    const firsNameFiltered = !firstNameFilter ? entities : filterProp(entities, 'firstName', firstNameFilter);
    console.timeEnd('firstName');

    console.time('lastName');
    const lastNameFiltered = !firstNameFilter ? firsNameFiltered : filterProp(firsNameFiltered, 'lastName', lastNameFilter);
    console.timeEnd('lastName');

    console.time('pemission');
    const permissionFiltered = !permission.length ? lastNameFiltered : includesAnyPermissions(lastNameFiltered, permission);
    console.timeEnd('pemission');

    console.time('sort');
    const sorted = sortProp(permissionFiltered, 'firstName');
    console.timeEnd('sort');

    const toShow = sorted.slice(0, 100);

    return (
        <div className="App">
            <div className="filters">
                <label htmlFor="firstName">firstName</label>
                <input id="firstName" name="firstName" type="text" onChange={changeFirstName} />

                <label htmlFor="lastName">firstName</label>
                <input id="lastName" name="lastName" type="text" onChange={changeLastName} />
            </div>
            <div className="entities">
                {toShow.map(({firstName, lastName, permitted}, index) => {
                    const identifier = `${firstName}${lastName}${index}`;
                    const values = Array.from(permitted).join(' ');
                    return (
                        <div key={identifier} className="item">
                            <span>{firstName}</span>
                            <span>{lastName}</span>
                            <span>{values}</span>
                        </div>
                    );
                    
                })}
            </div>
            <div className="permissions">
                {resources.map((item, index) => {
                    const identifier = `${item}${index}`;
                    const checked = permission.includes(item);
                    return (
                        <label key={identifier} htmlFor={identifier}>
                            {item}
                            <input
                                type="checkbox"
                                name={identifier}
                                id={identifier}
                                checked={checked}
                                onChange={(e) => changePermissions(item, checked)}
                            />
                        </label>
                    );
                })}
            </div>
        </div>
    );
}

export default App;
