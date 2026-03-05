const icons = {
  Documents: "folder",
  Articles: "people",
  Books: "book",
  Manuscripts: "people",
  Users: "people",
  Subjects: "book",
};

export default function DashboardCardIcon({ cardKey, value }) {
  return (
    <div className="col-md-2">
      <div className="card card-pricing">
        <div className="card-content content-primary">
          <div className="icon icon-info">
            <i className="material-icons">{icons[cardKey] || "folder"}</i>
          </div>
          <h3 className="card-title">{value}</h3>
          <h4 className="category text-gray">{cardKey}</h4>
        </div>
      </div>
    </div>
  );
}
