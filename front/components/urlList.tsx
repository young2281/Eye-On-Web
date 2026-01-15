'use client';
import { useState } from 'react';

export default function UrlList() {
    const [url, setUrl] = useState('');
    const [sites, setSites] = useState<{id: number, url: string, status: string}[]>([]);
    const addSite = async () => { //비동기 : async
        if (!url) return;
        //백엔드로 url 전송
        try {
            const response = await fetch( // 비동기니까 나올때까지 기다리기 : await
                'http://localhost:8080/api/sites/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }), // url 데이터 
                }
            );
            if (response.ok) {
                const data = await response.text();
                console.log('Site added successfully:', data);  
                //프론트의 리스트에 추가 
                const newSite = { id: Date.now(), url, status: 'active' };
                setSites([...sites, newSite]);
                setUrl('');
            }
        }catch (error) {
            console.error('Error adding site:', error);
        }

        
    };
    return (
        <div className="mt-12 w-full max-w-2xl mx-auto">
            {/* enter url */}
            <div className="flex gap-2 mb-10">
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter URL"
                    className="flex-1 px-4 py-2 bg-gray-700/30 backdrop-blur-md border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-white placeholder-gray-200"
                />
                <button
                    onClick={addSite}
                    className="px-4 py-2 bg-gray-500/30 backdrop-blur-md text-white rounded-lg hover:bg-gray-600/40 transition-colors"
                >
                    Add Site
                </button>
            </div>
            {/* card list */}
            <div className="grid gap-4">
                {sites.map((site) => (
                    <div key={site.id} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700">{site.url}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${site.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {site.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
            
    );
}