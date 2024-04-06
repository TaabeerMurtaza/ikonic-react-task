import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import NavLink from '@/Components/NavLink';


export default function Index({ auth, feedbacks }) {
    const initialFeedbackData = feedbacks || []; // Default to an empty array if feedbacks.data is undefined
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageData, setCurrentPageData] = useState([]);

    useEffect(() => {
        const itemsPerPage = 10; // Number of items per page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setCurrentPageData(initialFeedbackData.slice(startIndex, endIndex));
    }, [currentPage, initialFeedbackData]);

    const totalPages = Math.ceil(initialFeedbackData.length / 10); // Calculate total pages based on initialFeedbackData length

    const handlePageChange = (page) => {
        setCurrentPage(page);
        const startIndex = (page - 1) * 10;
        const endIndex = startIndex + 10;
        setCurrentPageData(initialFeedbackData.slice(startIndex, endIndex));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-3xl text-gray-800 dark:text-gray-200 leading-tight mb-4">Feedback</h2>}
        >
            <Head title="Feedback" />
            <div className="container mt-4">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {currentPageData.map(f => (
                        <NavLink href={route('feedback.get', f.id)}>
                            <div className="col" key={f.id}>

                                <div className="card h-100">
                                    <div className="card-body">
                                        <h5 className="card-title fw-bold fs-4">{f.title}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">{f.category}</h6>
                                        <p className="card-text">Submitted by: {f.user.name}</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-top-0">
                                        <small className="text-muted">Submitted on {new Date(f.created_at).toLocaleDateString()}</small>
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                    ))}
                </div>
                <nav aria-label="Page navigation">
                    <ul className="pagination mt-4">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <li className={`page-item ${currentPage === i + 1 ? 'active' : ''}`} key={i}>
                                <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </AuthenticatedLayout>
    );
}
