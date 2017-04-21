import React from 'react';

export default function Form({}) {
  return (
    <div className="panel-body">
      <h3 className="space-top-4">
        Congratulations!{""}
      </h3>
      <h3>
        You have published
      </h3>
      <div className="space-2 space-top-4">
        Now the whole world can experience this activity.
        <br />
      </div>
      <a className="btn btn-special" href="/bookings/requests/pending">
        View Booking Requests
      </a>
    </div>
  );
}
