'use strict'

const Route = use('Route')
const Logger = use('Logger')

class Jekko {
    constructor () {
    }

    shareIsActiveRouteViewGlobal (request, view) {
        view.share({
            request,
            isActiveRoute: function (route, output = 'active') {
                if(route.includes("*"))
                {
                    let filtered = Jekko.getFilteredRoutes(route)
                    let urls = []
                    for(let route of filtered)
                    {
                        urls.push(Route.url(route.name))
                    }

                    return (urls.includes(request.url())) ? this.safe(`${output}`) : this.safe(``)
                }
                else
                {
                    return (Route.url(route) == request.url()) ? this.safe(`${output}`) : this.safe(``)
                }
            }
        })
    }

    shareIsActiveURLViewGlobal (request, view) {
        view.share({
            request,
            isActiveURL: function (url, output = 'active') {
                return (url == request.url()) ? this.safe(`${output}`) : this.safe(``)
            }
        })
    }

    shareIsActiveMatchViewGlobal (request, view) {
        view.share({
            request,
            isActiveMatch: function (string, output = 'active') {
                return ((request.url()).includes(string)) ? this.safe(`${output}`) : this.safe(``)
            }
        })
    }

    shareAreActiveRoutesViewGlobal (request, view) {
        view.share({
            request,
            areActiveRoutes: function (routes, output = 'active') {
                for (let route of routes)
                {
                    if(route.includes("*"))
                    {
                        let filtered = Jekko.getFilteredRoutes(route)
                        let urls = []
                        for(let route of filtered)
                        {
                            urls.push(Route.url(route.name))
                        }

                        if(urls.includes(request.url()))
                        {
                            return this.safe(`${output}`)
                        }
                    }
                    else if(Route.url(route) == request.url())
                    {
                        return this.safe(`${output}`)
                    }
                }
                return this.safe(``)
            }
        })
    }

    shareAreActiveURLsViewGlobal (request, view) {
        view.share({
            request,
            areActiveURLs: function (urls, output = 'active') {
                for (let url of urls)
                {
                    if(url == request.url())
                    {
                        return this.safe(`${output}`)
                    }
                }

                return this.safe(``)
            }
        })
    }

    static getFilteredRoutes(route) {
        let regex = "^" + route.replace(".*", "\\.[^.]*?")
        let routes = Route.list()
        let filtered = routes.filter(({name}) => name.match(regex))

        return filtered
    }

    async handle({ request, view }, next) {
        this.shareIsActiveRouteViewGlobal(request, view)
        this.shareIsActiveURLViewGlobal(request, view)
        this.shareIsActiveMatchViewGlobal(request, view)
        this.shareAreActiveRoutesViewGlobal(request, view)
        this.shareAreActiveURLsViewGlobal(request, view)

        await next()
    }
}

module.exports = Jekko