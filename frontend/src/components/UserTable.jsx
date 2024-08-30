const UserTable = ({ users, isChangingPage }) => {
	const headStyle =
		"px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider";
	const cellStyle = "px-2 sm:px-4 py-2 whitespace-nowrap text-sm";
	const checkDep = (dep) => {
		if (dep == "CSE") {
			return 2;
		} else if (dep == "CE" || dep == "IT") {
			return 1;
		} else {
			return 3;
		}
	};
	const checkStatus = (stat) => {
		if (stat == "online") return true;
		return false;
	};
	return (
		<div className="overflow-x-scroll no-scrollbar bg-gray-900 rounded-lg border border-[#2e2c4e]">
			<table className="min-w-full table-auto">
				<thead className="bg-[#1d1b31]">
					<tr>
						<th className={`${headStyle}`}>ID</th>
						<th className={`${headStyle}`}>Name</th>
						<th className={`${headStyle} hidden smd:table-cell`}>
							Active Status
						</th>
						<th className={`${headStyle} hidden sm:table-cell`}>
							Enrollment No
						</th>
						<th className={`${headStyle} hidden md:table-cell`}>Department</th>
						<th className={`${headStyle} hidden lg:table-cell`}>Year-Div</th>
					</tr>
				</thead>
				<tbody
					className={`divide-y divide-[#2e2c4e] transition-opacity duration-300 ${
						isChangingPage ? "opacity-0" : "opacity-100"
					}`}
				>
					{users.map((user, index) => (
						<tr
							key={user.id}
							className="text-white border-[#2e2c4e] border-1 hover:bg-[#2e2c4e] transition-colors duration-500 hover:cursor-pointer"
						>
							<td className={`${cellStyle}`}>{index + 1}</td>
							<td className={`${cellStyle}`}>{user.name}</td>
							<td
								className={`${cellStyle} hidden smd:table-cell ${
									true ? "text-green-400" : "text-gray-400"
								}`}
							>
								{"online"}
							</td>
							<td className={`${cellStyle} hidden sm:table-cell`}>
								{user.enr_no}
							</td>
							<td className={`${cellStyle} hidden md:table-cell`}>
								{user.branch}
							</td>
							<td className={`${cellStyle} hidden lg:table-cell`}>
								{`SY-${checkDep(user.branch)}`}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
export default UserTable;
