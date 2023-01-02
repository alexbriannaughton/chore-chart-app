class CommentsController < ApplicationController
    def show
        cw = ChoreWheel.find(params[:id])
        render json: cw.comments.order(created_at: :desc).limit(6)
    end
    def create
        comment = Comment.create!(comment_params)
        render json: comment, status: :created
    end

    private

    def comment_params
        params.permit(:text, :user_id, :chore_wheel_id)
    end
end
