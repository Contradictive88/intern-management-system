    
import React from 'react';

const DtrRecordsTable: React.FC = () => {
    return (
        <div className="m-4">
            <table className="w-full rounded-lg shadow-lg border">
                <thead>
                <tr className="bg-main-800">
                    <th className="p-6 text-left text-md font-medium text-white uppercase tracking-wider">Date</th>
                    <th className="p-6 text-left text-md font-medium text-white uppercase tracking-wider">Time In</th>
                    <th className="p-6 text-left text-md font-medium text-white uppercase tracking-wider">Time Out</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap">2021-01-01</td>
                    <td className="px-6 py-4 whitespace-nowrap">08:00</td>
                    <td className="px-6 py-4 whitespace-nowrap">17:00</td>
                </tr>
                <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">2021-01-02</td>
                    <td className="px-6 py-4 whitespace-nowrap">08:00</td>
                    <td className="px-6 py-4 whitespace-nowrap">17:00</td>
                </tr>
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap">2021-01-03</td>
                    <td className="px-6 py-4 whitespace-nowrap">08:00</td>
                    <td className="px-6 py-4 whitespace-nowrap">17:00</td>
                </tr>
                <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">2021-01-04</td>
                    <td className="px-6 py-4 whitespace-nowrap">08:00</td>
                    <td className="px-6 py-4 whitespace-nowrap">17:00</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default DtrRecordsTable;
