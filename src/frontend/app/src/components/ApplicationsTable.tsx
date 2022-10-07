import React from "react";
import useApplications from "../hooks/applications";

function ApplicationsTable() {
    const {applicationsStat, isLoading, error, fetchApplicationsStat} = useApplications();

    return (
        <div className="container-sm mt-5">
            <button type="button" className="btn btn-primary m-auto" onClick={fetchApplicationsStat}>Обновить таблицу</button>
            {!error && <table className="table mt-5">
                <thead>
                <tr>
                    <th scope="col">Название документа</th>
                    <th scope="col">Количество заявок</th>
                </tr>
                </thead>
                <tbody>
                {applicationsStat.map(applicationStat => {
                    return (
                        <tr>
                            <td>{applicationStat.documentname}</td>
                            <td>{applicationStat.count}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            }
        </div>
    )
}
export default ApplicationsTable;