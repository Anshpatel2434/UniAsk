
const UserTable = ({ users }) => {
    const headStyle =
      "px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider";
    const cellStyle = "px-4 py-2 whitespace-nowrap";
    const checkDep = (dep) => {
      if (dep == "CSE" || dep == "AIML") {
        return 2;
      } else if (dep == "CE" || dep == "IT") {
        return 1;
      } else {
        return 3;
      }
    };
    return (
      <div className="overflow-x-auto bg-[#11101d] rounded-lg border border-[#2e2c4e]">
        <table className="min-w-full">
          <thead className="bg-[#1d1b31]">
            <tr>
              <th className={`${headStyle}`}>ID</th>
              <th className={`${headStyle}`}>Name</th>
              <th className={`${headStyle}`}>Enrollment No</th>
              <th className={`${headStyle}`}>Department</th>
              <th className={`${headStyle}`}>Year-Div</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2e2c4e]">
            {users.map((user,index) => (
              <tr key={user.id} className="text-white border-[#2e2c4e] border-1 hover:bg-[#2e2c4e] transition-colors duration-500 hover:cursor-pointer">
                <td className={`${cellStyle}`}>{index+1}</td>
                <td className={`${cellStyle}`}>{user.name}</td>
                <td className={`${cellStyle}`}>{user.enroll}</td>
                <td className={`${cellStyle}`}>{user.dep}</td>
                <td className={`${cellStyle}`}>
                  {user.yeardiv}-{checkDep(user.dep)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
export default UserTable