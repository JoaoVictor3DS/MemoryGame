export const Victory = () => {
    return (
        <div className="fixed inset-0 bg-success bg-opacity-50 backdrop-blur-sm text-center m-4">
            <div className="fs-1">
                <p>You Wins</p>
            </div>
            <div className="fs-5">
                <a href="/">Reload</a>
            </div>
        </div>
    );
}