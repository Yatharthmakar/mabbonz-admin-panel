import React, { useEffect, useState } from 'react'
import { useLocation, Link } from "react-router-dom";
import TitleCard from "../../components/Cards/TitleCard";

export default function ShowDetail() {

    const [data, setData] = useState();
    const location = useLocation();

    useEffect(()=>{
        const data = location.state?.data;
        setData(data);
        console.log(data);
    },[]);
    
  return (
    <div>
    <Link to="/app/priceandtagapp"><button className="btn btn-xl">Back</button></Link>
      <TitleCard title={"Detailed Information"}>
      <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className="normal-case">Attribute</th>
                            <th className="normal-case">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Installed at</td>
                            <td>{data?.installed_at}</td>
                        </tr>
                        <tr>
                            <td>Last used at</td>
                            <td>{data?.last_used}</td>
                        </tr>
                        <tr>
                            <td>Uninstalled at</td>
                            <td>{data?.uninstalled_at}</td>
                        </tr>
                        <tr>
                            <td>Owner Name</td>
                            <td>{data?.store_data.shop_owner}</td>
                        </tr>
                        <tr>
                            <td>Store Name</td>
                            <td>{data?.store_data.name}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{data?.store_data.email}</td>
                        </tr>
                        <tr>
                            <td>Phone Number</td>
                            <td>{data?.store_data.phone}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>{data?.store_data.address1}, {data?.store_data.province}, {data?.store_data.country_name}, {data?.store_data.zip}</td>
                        </tr>
                        <tr>
                            <td>Time Zone</td>
                            <td>{data?.store_data.timezone}</td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
      </TitleCard>
    </div>
  )
}
