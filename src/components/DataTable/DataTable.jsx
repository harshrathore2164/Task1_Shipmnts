import React, { useState } from "react";
import "./styles.css";
import mockData from "./data";

const DataTable = () => {
  const [data, setData] = useState(mockData);
  const [filters, setFilters] = useState({
    id: "",
    name: "",
    salary: "",
    projectsCompleted: "",
    hireDate: "",
    lastLogin: "",
    accessLevel: "",
  });

  const [filterConditions, setFilterConditions] = useState({
    idCondition: "equals",
    salaryCondition: "equals",
    projectsCompletedCondition: "equals",
    nameCondition: "contains",
    hireDateCondition: "dateIs",
    lastLoginCondition: "dateIs",
  });

  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "ascending",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleConditionChange = (e) => {
    const { name, value } = e.target;
    setFilterConditions({ ...filterConditions, [name]: value });
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    sortData(key, direction);
  };

  const sortData = (key, direction) => {
    let sortedData = [...data];
    sortedData.sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setData(sortedData);
  };

  const applyFilters = () => {
    let filteredData = mockData;

    if (filters.id) {
      filteredData = filteredData.filter((item) => {
        const id = item.id.toString();
        return applyCondition(id, filters.id, filterConditions.idCondition);
      });
    }
    if (filters.name) {
      filteredData = filteredData.filter((item) =>
        item.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    if (filters.salary) {
      filteredData = filteredData.filter((item) => {
        const salary = item.salary.toString();
        return applyCondition(salary, filters.salary, filterConditions.salaryCondition);
      });
    }
    if (filters.projectsCompleted) {
      filteredData = filteredData.filter((item) => {
        const projectsCompleted = item.projectsCompleted.toString();
        return applyCondition(projectsCompleted, filters.projectsCompleted, filterConditions.projectsCompletedCondition);
      });
    }
    if (filters.hireDate) {
      filteredData = filteredData.filter((item) => {
        const hireDate = new Date(item.hireDate).toISOString().split('T')[0];
        return applyDateCondition(hireDate, filters.hireDate, filterConditions.hireDateCondition);
      });
    }
    if (filters.lastLogin) {
      filteredData = filteredData.filter((item) => {
        const lastLogin = new Date(item.lastLogin).toISOString().split('T')[0];
        return applyDateCondition(lastLogin, filters.lastLogin, filterConditions.lastLoginCondition);
      });
    }
    if (filters.accessLevel) {
      filteredData = filteredData.filter((item) =>
        item.accessLevel === filters.accessLevel
      );
    }

    setData(filteredData);
  };

  const applyCondition = (itemValue, filterValue, condition) => {
    switch (condition) {
      case "equals":
        return itemValue === filterValue;
      case "notEqual":
        return itemValue !== filterValue;
      case "lessThan":
        return parseFloat(itemValue) < parseFloat(filterValue);
      case "lessThanOrEqual":
        return parseFloat(itemValue) <= parseFloat(filterValue);
      case "greaterThan":
        return parseFloat(itemValue) > parseFloat(filterValue);
      case "greaterThanOrEqual":
        return parseFloat(itemValue) >= parseFloat(filterValue);
      default:
        return true;
    }
  };

  const applyDateCondition = (itemValue, filterValue, condition) => {
    switch (condition) {
      case "dateIs":
        return itemValue === filterValue;
      case "lessThan":
        return new Date(itemValue) < new Date(filterValue);
      case "lessThanOrEqual":
        return new Date(itemValue) <= new Date(filterValue);
      case "greaterThan":
        return new Date(itemValue) > new Date(filterValue);
      case "greaterThanOrEqual":
        return new Date(itemValue) >= new Date(filterValue);
      case "notEqual":
        return itemValue !== filterValue;
      case "isNull":
        return !itemValue;
      case "isNotNull":
        return !!itemValue;
      default:
        return true;
    }
  };

  return (
    <div className="container">
      <h1>Shipmnts Task 1 </h1>
      <div className="filters">
        <div className="filter-group">
          <label>ID:</label>
          <input
            type="text"
            name="id"
            value={filters.id}
            onChange={handleFilterChange}
          />
          <select
            name="idCondition"
            value={filterConditions.idCondition}
            onChange={handleConditionChange}
          >
            <option value="equals">Equals</option>
            <option value="notEqual">Not equal</option>
            <option value="lessThan">Less than</option>
            <option value="lessThanOrEqual">Less than or equal</option>
            <option value="greaterThan">Greater than</option>
            <option value="greaterThanOrEqual">Greater than or equal</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
          />
          <select
            name="nameCondition"
            value={filterConditions.nameCondition}
            onChange={handleConditionChange}
          >
            <option value="contains">Contains</option>
            <option value="notContains">Not contains</option>
            <option value="equals">Equals</option>
            <option value="notEqual">Not equal</option>
            <option value="startsWith">Starts with</option>
            <option value="endsWith">Ends with</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Salary:</label>
          <input
            type="text"
            name="salary"
            value={filters.salary}
            onChange={handleFilterChange}
          />
          <select
            name="salaryCondition"
            value={filterConditions.salaryCondition}
            onChange={handleConditionChange}
          >
            <option value="equals">Equals</option>
            <option value="notEqual">Not equal</option>
            <option value="lessThan">Less than</option>
            <option value="lessThanOrEqual">Less than or equal</option>
            <option value="greaterThan">Greater than</option>
            <option value="greaterThanOrEqual">Greater than or equal</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Projects Completed:</label>
          <input
            type="text"
            name="projectsCompleted"
            value={filters.projectsCompleted}
            onChange={handleFilterChange}
          />
          <select
            name="projectsCompletedCondition"
            value={filterConditions.projectsCompletedCondition}
            onChange={handleConditionChange}
          >
            <option value="equals">Equals</option>
            <option value="notEqual">Not equal</option>
            <option value="lessThan">Less than</option>
            <option value="lessThanOrEqual">Less than or equal</option>
            <option value="greaterThan">Greater than</option>
            <option value="greaterThanOrEqual">Greater than or equal</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Hire Date:</label>
          <input
            type="date"
            name="hireDate"
            value={filters.hireDate}
            onChange={handleFilterChange}
          />
          <select
            name="hireDateCondition"
            value={filterConditions.hireDateCondition}
            onChange={handleConditionChange}
          >
            <option value="dateIs">Date is</option>
            <option value="lessThan">Less than</option>
            <option value="lessThanOrEqual">Less than or equal</option>
            <option value="greaterThan">Greater than</option>
            <option value="greaterThanOrEqual">Greater than or equal</option>
            <option value="notEqual">Not equal</option>
            <option value="isNull">Is null</option>
            <option value="isNotNull">Is not null</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Last Login:</label>
          <input
            type="date"
            name="lastLogin"
            value={filters.lastLogin}
            onChange={handleFilterChange}
          />
          <select
            name="lastLoginCondition"
            value={filterConditions.lastLoginCondition}
            onChange={handleConditionChange}
          >
            <option value="dateIs">Date is</option>
            <option value="lessThan">Less than</option>
            <option value="lessThanOrEqual">Less than or equal</option>
            <option value="greaterThan">Greater than</option>
            <option value="greaterThanOrEqual">Greater than or equal</option>
            <option value="notEqual">Not equal</option>
            <option value="isNull">Is null</option>
            <option value="isNotNull">Is not null</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Access Level:</label>
          <select
            name="accessLevel"
            value={filters.accessLevel}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
      </div>

      <button onClick={applyFilters}>Apply Filters</button>

      <table>
        <thead>
          <tr>
            <th>
              ID
              <button onClick={() => handleSort("id")}>
                {sortConfig.key === "id" && sortConfig.direction === "ascending"
                  ? "🔼"
                  : "🔽"}
              </button>
            </th>
            <th>
              Name
              <button onClick={() => handleSort("name")}>
                {sortConfig.key === "name" && sortConfig.direction === "ascending"
                  ? "🔼"
                  : "🔽"}
              </button>
            </th>
            <th>
              Salary
              <button onClick={() => handleSort("salary")}>
                {sortConfig.key === "salary" && sortConfig.direction === "ascending"
                  ? "🔼"
                  : "🔽"}
              </button>
            </th>
            <th>
              Projects Completed
              <button onClick={() => handleSort("projectsCompleted")}>
                {sortConfig.key === "projectsCompleted" && sortConfig.direction === "ascending"
                  ? "🔼"
                  : "🔽"}
              </button>
            </th>
            <th>Hire Date</th>
            <th>Last Login</th>
            <th>Access Level</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.salary}</td>
              <td>{item.projectsCompleted}</td>
              <td>{new Date(item.hireDate).toLocaleDateString()}</td>
              <td>{new Date(item.lastLogin).toLocaleDateString()}</td>
              <td>{item.accessLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
