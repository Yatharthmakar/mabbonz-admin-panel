import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../features/common/headerSlice';
import TitleCard from "../../components/Cards/TitleCard";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";

export default function Priceadntagapp() {

    const [data, setData] = useState();
    const [select, setSelect] = useState("status");
    const dispatch = useDispatch();

    let [exportData, setExportData] = useState([]);

    const user = [
        { store_data: { shop_owner: 'loading', name: 'loading', customer_email: 'loading', phone: 'loading' } }
    ]

    const handleExport = (result) => {
        let exp = []
        Object.entries(data?data: result).map(([key, value]) => {
            if (select === "status" || (select === "installed" && value.uninstalled_at === "-") || (select === "uninstalled" && value.uninstalled_at !== "-")) {
                exp.push({
                    "name": value.store_data.shop_owner,
                    "store name": value.store_data.name,
                    "email": value.store_data.customer_email,
                    "contact": value.store_data.phone,
                    "provence": value.store_data.province,
                    "country": value.store_data.country_name,
                    "time zone": value.store_data.timezone,
                    "installed at": value.installed_at,
                    "uninstalled at": value.uninstalled_at,
                })
            }
        });
        setExportData(exp);
    };

    useEffect(() => {
        dispatch(setPageTitle({ title: "Price & Tag App" }))
        const fetchUserData = async () => {
            const response = await fetch('https://tags.mabbonz.in/malik/mapi/getuserdata');
            const result = await response.json();
            setData(result);
            handleExport(result);
            console.log(result);
        }
        fetchUserData();
        
    }, []);


    return (
        <TitleCard title={"User Information"}>
            <CSVLink  className="btn btn-active btn-primary" data={exportData} onClick={handleExport} filename={select+" TagsandPrice"}>Export</CSVLink>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th className="normal-case">Name</th>
                            <th className="normal-case">Store Name</th>
                            <th className="normal-case">Email</th>
                            <th className="normal-case">Contact</th>
                            <th className="normal-case">
                                <select className="select w-28" onChange={(e) =>{setSelect(e.target.value);}}>
                                    <option value="status">Status</option>
                                    <option value="installed">Installed</option>
                                    <option value="uninstalled">Uninstalled</option>
                                </select>
                            </th>
                            <th className="normal-case"></th>
                            <th className="normal-case"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.entries(data ? data : user).map(([key, value]) => {
                                const k = Number(key);
                                if (select === "status" || (select === "installed" && value.uninstalled_at === "-") || (select === "uninstalled" && value.uninstalled_at !== "-")) {
                                    return (
                                        <tr key={k}>
                                            <th>{k + 1}</th>
                                            <td>{value.store_data.shop_owner}</td>
                                            <td>{value.store_data.name}</td>
                                            <td>{value.store_data.customer_email}</td>
                                            <td>{value.store_data.phone}</td>
                                            <td>{value.uninstalled_at === "-" ? "Installed" : "Uninstalled"}</td>
                                            <th><Link to="/app/showdetail" state={{ data: value }}><button className="btn btn-ghost btn-xs">Details</button></Link></th>
                                            <th><Link to="/app/showchats" state={{ data: {"storeName": value.storeName, "timezone": value.store_data.timezone } }}><button className="btn btn-ghost btn-xs">Chats</button></Link></th>
                                        </tr>
                                    )
                                }
                            })
                        }
                    </tbody>
                </table>
            </div>
        </TitleCard>
    )
}
