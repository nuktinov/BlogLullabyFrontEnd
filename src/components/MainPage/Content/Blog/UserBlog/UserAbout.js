import React from 'react';
import { connect } from 'react-redux'

function UserAbout ({userProfile, loading, errorList}) {
    return (
        <div>
            <div>UserAbout</div>
        </div>
    )
};

const mapStateToProps = state => {
    return {
      userProfile: state.userProfile.profile,
      loading: state.userProfile.loading,
      errorList: state.userProfile.errorList
    }
}

export default connect(mapStateToProps, null)(UserAbout)