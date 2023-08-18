export const Team = ({ children, teams }) => {
  return (
    <div className="w-[200px] min-h-[200px] bg-gray-600 rounded-lg m-2 p-3 flex flex-col">
      <div>{children}</div>

      <div className="flex flex-col">
        {teams &&
          teams.map((el) => {
            const skillOfPerson = localStorage.getItem(String(el));
            return (
              <div>
                {el} {skillOfPerson}
              </div>
            );
          })}
      </div>
    </div>
  );
};
