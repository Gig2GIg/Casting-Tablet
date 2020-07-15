const DEFINE = {
    caster_type : 1,
    qr_code_walkin: "/images/qr_codes/qr@3x.png",
    role_placeholder: "/images/roles.png",
    loading_placeholder: "/images/Loadingsome.gif",
    set_pass_code_key : 'checkin_set_pass_code',
    set_monitor_pass_code_key : 'monitor_set_pass_code',
    contact_us : "support@gig2gig.com",
    CHAT_PEFIX : process.env.VUE_APP_CHAT_PREFIX,
    account_email : "accounts@gig2gig.com",    
    common_error_message : 'Oops! something went to wrong!',
    no_plan_subscirbed_error : "You don't have any subscription to access this feature.",
    no_plan_sub_user_subscirbed_error : "You don't have any subscription to access this feature, please contact admin.",
    thumbSize :{
        defaultWidth : 200,
        defaultHeight : 200,
        videoThumbWidth : 200,
        imageThumbWidth : 250,
        coverImageThumbWidth : 200,
        docImageThumbWidth : 200,
        roleImageThumbWidth : 150
    },
    cover_image : {
        min_width : 350,
        min_height : 350
    },
    google : {
        key: "AIzaSyCBwvwOsPR82AjeUx5o3FUvr4syuoNFrLI", // old one => AIzaSyCNwa9Hpkf463makeiBW_vSMH2Y0sY23q0
        libraries: "places"
    },
    firebase_permission_error:{
        code : "messaging/permission-blocked",
        name : "FirebaseError"
    },
    tours : [
        {
            step : 1,
            title : "Create Your Audition",
            details : "Add your production information, tags, contributors, and upload production documents to get started!",
            image : "/images/tours/create_audition.png"
        },
        {
            step : 2,
            title : "Instant Feedback",
            details : "Once checked-in, instantly inform talent of your immediate reaction. Press check to send a 'Great Job' and recommend additional productions, or press X to let them know that's all you need today.",
            image : "/images/tours/instant_feedback.png"
        },
        {
            step : 3,
            title : "Feedback",
            details : "Full feedback can be sent to talent once an Audition Round has been completed. Collaborate with contributors, and add tags for future reference.",
            image : "/images/tours/feedback.png"
        },
        {
            step : 4,
            title : "Manage Rounds",
            details : "Easily manage multiple round auditions. Star performers who have earned a second look, and they’ll receive an invitation for a new appointment.",
            image : "/images/tours/manage_rounds.png"
        },
        {
            step : 5,
            title : "Final Casting List",
            details : "Place available talent into roles. Easily edit as needed, and export Final List to CSV.",
            image : "/images/tours/final_cast_list.png"
        }
    ]
}

export default DEFINE;